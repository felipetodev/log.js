self.onmessage = async (event) => {
  const { code } = event.data;

  const outputBuffer: string[] = [];
  const originalLog = console.log;
  console.log = (...args) => {
    const formattedArgs = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        return JSON.stringify(arg, null, 2);
      }
      if (typeof arg === 'string') {
        return `'${arg}'`;
      }
      return String(arg);
    });
    outputBuffer.push(formattedArgs.join(' '));
  };

  try {
    const func = new Function(code);
    func();
    self.postMessage({ output: outputBuffer.join('\n') });
  } catch (error) {
    if (error instanceof Error) {
      self.postMessage({ output: `Error: ${error.message}` });
    } else {
      self.postMessage({ output: 'An unknown error occurred' });
    }
  }

  console.log = originalLog;
};
