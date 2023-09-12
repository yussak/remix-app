import { LinksFunction } from "@remix-run/node"

import stylesUrl from "~/styles/index.css"

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: stylesUrl },
]

export default function Index() {
    return <div>Hello index route</div>
}