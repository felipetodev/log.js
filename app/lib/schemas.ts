import * as v from "valibot";

const FormDataSchema = v.object({
  id: v.pipe(v.string(), v.uuid()),
  code: v.string()
});

const ParamsSchema = v.object({
  id: v.pipe(v.string(), v.uuid())
})

export type FormData = v.InferInput<typeof FormDataSchema>
export type Params = v.InferInput<typeof ParamsSchema>

export const validateFormData = (formEntries: Record<string, FormDataEntryValue>) => {
  return v.safeParse(FormDataSchema, formEntries)
}

export const validateParams = (params: Params) => {
  return v.safeParse(ParamsSchema, params)
}
