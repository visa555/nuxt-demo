export default function(context, inject){
    const appId = 'PQ8O57M20L'
    const apiKey = 'e0a568b29004a9f1556ecd4a84ab3068'
    const headers = {
        'X-Algolia-API-Key': apiKey,
        'X-Algolia-Application-Id': appId,
    }
    inject('dataApi', {
        getHome,
        getReviewsByHomeId,
        getUserByHomeId
    })

    async function getHome(homeId){
        try {
        return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/home/${homeId}`, { headers }))        
        } catch(error){
            return getErrorResponse(error)
        }
    }

    async function getReviewsByHomeId(homeId) {
        try {
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/reviews/query`, {
            headers,
            method: 'POST',
            body: JSON.stringify({
                filters: `homeId:${homeId}`,
                hitsPerPage: 2,
                attributesToHighlight:[]
            })
        }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function getUserByHomeId(homeId) {
        try {
            return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/query`, {
            headers,
            method: 'POST',
            body: JSON.stringify({
                filters: `homeId:${homeId}`,
                attributesToHighlight:[]
            })
        }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function unWrap(response){
        const json = await response.json()
        const { ok, status, statusText } = response
        return {
            json,
            ok,
            status,
            statusText,
        }
    }

    function getErrorResponse(error){
        return {
            ok: false,
            status: 500,
            statusText: error.message,
            json: {}
        }
    }
}