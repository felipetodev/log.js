/// <reference lib="WebWorker" />

import {
  clearUpOldCaches,
  EnhancedCache,
  isDocumentRequest,
  isLoaderRequest,
  Logger,
  NavigationHandler,
  type DefaultFetchHandler,
 } from '@remix-pwa/sw'

export {};

declare let self: ServiceWorkerGlobalScope;

const version = 'v11';

const DOCUMENT_CACHE_NAME = `document-cache`;
const ASSET_CACHE_NAME = `asset-cache`;
const DATA_CACHE_NAME = `data-cache`;


const logger = new Logger({
  prefix: '[Log.js Service Worker]',
})

self.addEventListener('install', event => {
  logger.log('Service worker installed');

  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  logger.log('Service worker activated')

  event.waitUntil(Promise.all([
    clearUpOldCaches([DOCUMENT_CACHE_NAME,DATA_CACHE_NAME,ASSET_CACHE_NAME], version),
    self.clients.claim(),
  ]))
})

const documentCache = new EnhancedCache(DOCUMENT_CACHE_NAME, {
  version,
  strategy: 'CacheFirst',
  strategyOptions: {
    maxEntries: 64,
  }
})

const assetCache = new EnhancedCache(ASSET_CACHE_NAME, {
  version,
  strategy: 'CacheFirst',
  strategyOptions: {
    maxAgeSeconds: 3_600 * 24,
    maxEntries: 100,
  }
})

const dataCache = new EnhancedCache(DATA_CACHE_NAME, {
  version,
  strategy: 'NetworkFirst',
  strategyOptions: {
    networkTimeoutInSeconds: 10,
    maxEntries: 72,
  }
})

export const defaultFetchHandler: DefaultFetchHandler = async ({ context }) => {
  const request = context.event.request
  const url = new URL(request.url)
 
  if (isDocumentRequest(request)) {
   return documentCache.handleRequest(request)
  }
 
  if (isLoaderRequest(request)) {
   return dataCache.handleRequest(request)
  }
 
  if (self.__workerManifest.assets.includes(url.pathname)) {
   return assetCache.handleRequest(request)
  }
 
  return fetch(request)
 }

 const messageHandler = new NavigationHandler({
  cache: documentCache
})

self.addEventListener('message', (event: ExtendableMessageEvent) => {
  event.waitUntil(messageHandler.handleMessage(event))
})