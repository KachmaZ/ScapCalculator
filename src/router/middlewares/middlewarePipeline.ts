import type { Router } from 'vue-router'

export default (router: Router) => {
  router.beforeEach(async (to, from) => {
    // Находим мидлвары в свойстве meta.middlewares маршрута, на который происходит доступ
    // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
    const middlewares = to.meta.middlewares as Function[]
    // Если у маршрута нет мидлваров, переходим на страницу
    if (!middlewares) {
      return true
    }
    // Делаем перебор мидлваров
    for (const middleware of middlewares) {
      const result = await middleware({ to, from })
      // Если мидлвар возвращает объект или строку маршрута, прерываем цепочку и возвращаем результат
      if (typeof result === 'object' || typeof result === 'string' || result === false) {
        return result
      }
    }
    return true
  })
}
