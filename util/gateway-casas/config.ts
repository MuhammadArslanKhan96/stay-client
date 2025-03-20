const parentUrl = 'https://api-services.beat.homes/gtw-web/api'

export const LOGIN_END_POINT = {
    url :`${parentUrl}/Login`,
    method:"POST",    
}

export const HOTEL_END_POINT = {
    url : `${parentUrl}/Property/List`,
    method: "POST"
}