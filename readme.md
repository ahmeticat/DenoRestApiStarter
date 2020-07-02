# DenoRestApiStarter

This project is example [Deno](https://deno.land/) Rest Api with using mongodb and repository pattern

## **How to use**

1. Change 

> DB_URI 

 in **denon.json** with your mongodb connection string.

2. Install [denon](https://deno.land/x/denon) 

```bash
$ deno install --allow-read --allow-run --allow-write --allow-net -f --unstable https://deno.land/x/denon@v2.2.0/denon.ts
```

3. Starting API

To start API enter the following into a terminal

```bash
denon start
```

> Please do not forget to change **DB_URL** . If you forget it, the application is not start