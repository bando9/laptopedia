# Laptopedia - Laptop Information REST API

A modern and lightweight **informational REST API** providing structured and detailed information about laptops, including specifications, brands, categories, hardware components, and pricing insights.

## REST API Specification

- Local: <http://localhost:3000>
- Production: <https://laptopedia.bandomega.com>

| Endpoint Path    | HTTP Method | Description                                       | Available |
| ---------------- | ----------- | ------------------------------------------------- | --------- |
| `/laptops`       | GET         | Get all laptops                                   | ✅        |
| `/laptops/:slug` | GET         | Get one laptop by slug                            | ✅        |
| `/laptops`       | POST        | Add new laptop                                    | ✅        |
| `/laptops`       | DELETE      | Delete all laptops                                | ✅        |
| `/laptops/:id`   | DELETE      | Delete one laptop by id                           | ✅        |
| `/laptops/:id`   | PATCH       | Update laptop by id                               | ✅        |
| `/laptops/:id`   | PUT         | Update laptop by id. Create data if doesn't exist | ✅        |

## Get Started

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```
