import { defaultTracingKeys } from '@zcong/istio-helpers'

export const tracingKeys = [...defaultTracingKeys, 'x-user', 'x-version']
