# Stencil Redux Example 

This repo shows how to integrate RTK Query into a stencil app. It shows two ways of implementing the selectors, however,
the @stencil/store method exhibits a memory leak. This can be seen by viewing the number of nodes in devtools > performance monitor, 
and toggling the @Stencil/store todos list a few times & triggering garbage collection in the memory tab (and also the rxjs version for comparison)

## Running the application 

```
pnpm i
```

In one terminal,
```
cd mock-api
node server.ts
```

and in another:

```bash
npm run start 
```
