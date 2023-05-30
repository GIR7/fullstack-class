import { httpClient } from "./HttpClient.tsx"

export const PassService ={
	async send(sender_id:number, receiver_id:number){
		return httpClient.post("/pass",{sender_id,passee_id:receiver_id})
	}
}
