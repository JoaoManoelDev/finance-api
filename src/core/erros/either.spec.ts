import { Either, left, right } from "./either"

const doSomething = (shouldSuccess: boolean): Either<string, number> => {
  if (shouldSuccess) return right(10)

  return left('error')
}

test('success result', () => {
  const result = doSomething(true)

  expect(result.isLeft()).toBe(false)
  expect(result.isRight()).toBe(true)
  expect(result.value).toBe(10)
})

test('error result', () => {
  const result = doSomething(false)

  expect(result.isLeft()).toBe(true)
  expect(result.isRight()).toBe(false)
  expect(result.value).toBe('error')
})