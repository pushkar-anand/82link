type RedirectHandler = (parsedURL: URL) => string | undefined

const postMarkRedirectURL: RedirectHandler = (parsedURL) => {
    if (!parsedURL.pathname) {
        return undefined;
    }

    if (parsedURL.pathname === "") {
        return undefined
    }

    const parts = parsedURL.pathname.split("/")

    if (parts.length >= 3) {
        const decodedUrl = decodeURIComponent(parts[2]);
        return `${parsedURL.protocol}${decodedUrl}`
    }

    return undefined
}


export const trackingDomainToHandlerMap: Record<string, RedirectHandler> = {
    "click.pstmrk.it": postMarkRedirectURL
}
