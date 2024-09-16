import fastfy from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { createGoalRoute } from './src/http/routes/create-goal'
import { createCompletionRoute } from './src/http/routes/create-completion'
import { getPendingGoalsRoute } from './src/http/routes/get-pending-goals'
import { getWeekSummaryRoute } from './src/http/routes/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastfy().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.register(createGoalRoute)
app.register(createCompletionRoute)
app.register(getPendingGoalsRoute)
app.register(getWeekSummaryRoute)
app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running!')
  })
