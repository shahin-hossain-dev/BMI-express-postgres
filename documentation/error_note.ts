/**
 *
 *
 * ! higher order function make korte giye, higher order function er
 * ! child function e async use na korar karone error kheyeci.
 *
 * * How Solved:
 * * 1. child function async await use koreci
 * * 2. child function er inside e Promise.resolve(fn(req,res,next).catch(e => next(e)))  method use koreci
 *
 * ---------------------------------------------------
 * !! Doctor Services module e doctor create korar somoy custom error handler diye error ta return korar korone
 * ! database e save na hoyeo respose true 201 ashtecilo.
 *
 * * How Solved:
 * * Error handler theke return na kore (throw Error) korte hobe.
 *
 */
