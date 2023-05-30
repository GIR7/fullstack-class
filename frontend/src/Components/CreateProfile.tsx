import { httpClient } from "@/Services/HttpClient.tsx";
import { useState } from "react";

export enum SubmissionStatus {
	NotSubmitted,
	SubmitFailed,
	SubmitSucceeded
}

export const CreateProfile=() =>{
	const [selectedFile, setSelectedFile] = useState();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [petType, setPetType] = useState("");
	const [submitted, setSubmitted] = useState(SubmissionStatus.NotSubmitted);
	
	const onFileChange=ev=>{
		//grab the first file
		setSelectedFile(ev.target.files[0])
	}
	
	const onUploadFile =(ev) =>{
		const formData = new FormData();
		//create a field called name has value of whatever is inside of the name
		formData.append("name", name);
		formData.append('email', email);
		formData.append("password", password);
		formData.append("petType", petType);
		formData.append('file', selectedFile);
		// @ts-ignore
		formData.append("fileName", selectedFile.name);
		
		const config = {
			
			headers: {//new type of data
				'content-type': 'multipart/form-data',
			}
		};
		//send these data to our backend
		httpClient.post("/users", formData, config)
			.then( (response) => {
				console.log("Got response from uploading file", response.status);
				if (response.status === 200) {
					setSubmitted(SubmissionStatus.SubmitSucceeded);
				} else {
					setSubmitted(SubmissionStatus.SubmitFailed);//triggers react render "CREATING PROFILE FAILED" in return
				}
			});
	};
	
	return (
		<div>
			<div>Create Account:</div>
			<div>
				{
					submitted === SubmissionStatus.SubmitFailed??
					<h3>CREATING PROFILE FAILED</h3>
				}
			</div>
			
			<div>
			<label htmlFor ={"name"}>NameLable</label>
			<div>
				<input
					placeholder="Name..."
					type="text"
					id="name"
					required
					value={name}
					onChange={e => setName(e.target.value)}
					name="name"
					className="input input-bordered"
				/>
			</div>
		</div>
		
			<div>
			<label htmlFor ="petType">Pet Type</label>
			<div>
				<input
					placeholder="Dog..."
					type="text"
					id="petType"
					required
					value={petType}
					onChange={e => setPetType(e.target.value)}
					name="petType"
					className="input input-bordered"
				/>
			</div>
			</div>
			
			<div>
			<label htmlFor ={"email"}>Email: </label>
			<div>
				<input
					placeholder="email@email.com..."
					type="text"
					id="email"
					required
					value={email}
					onChange={e => setEmail(e.target.value)}
					name="email"
					className="input input-bordered"
				/>
			</div>
		</div>
			<div>
			<label htmlFor ={"password"}>Password: </label>
			<div>
				<input
					placeholder="password..."
					type="text"
					id="password"
					required
					value={password}
					onChange={e => setPassword(e.target.value)}
					name="password"
					className="input input-bordered"
				/>
			</div>
		</div>
			
			<div>
				<label htmlFor="profilepic" >Upload a profile picture</label>
				<div>
					<input
						type={"file"}
						className={"doggrFileUpload"}
						id={"profilepic"}
						name="profilepic"
						accept={"image/png, image/jpeg"}
						onChange={onFileChange}
					/>
				</div>
			</div>
			
			{
				name != null && password != null && selectedFile != null &&
        <div>
          <button className="btn btn-primary btn-circle" onClick={onUploadFile}>Create</button>
        </div>
			}
			
		</div>
		
		
	)
}
