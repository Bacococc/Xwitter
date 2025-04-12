import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { Input, Switcher, Title, Wrapper, Error } from "../components/auth-components";

export default function CreateAccount(){
    const[isLoading, setLoading] = useState(false);
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: {name, value} } = e;
        if(name === "name"){
            setName(value)
        } else if (name === "email") {
            setEmail(value)
        } else if (name === "password"){
            setPassword(value)
        } 
    }
    //firebase 회원가입 처리
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (isLoading || name === "" || email === "" || password === "")return; //로딩 중이거나 3 항목 중 하나라도 비었을 때, 프로세스 종료
        try {
            setLoading(true);
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName: name,
            }); 
            navigate("/");
        } catch (e) {
            if(e instanceof FirebaseError) {
                setError(e.message)
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <Title>Join 𝕏</Title>
            <Form onSubmit={onSubmit}>
                <Input name="name" placeholder="Name" type="text" required onChange={onChange}/>
                <Input name="email" placeholder="Email" type="text" required onChange={onChange}/>
                <Input name="password" 
                    placeholder="Password" 
                    type="password" 
                    required
                    onChange={onChange}
                />
                <Input type="submit" value={isLoading ? "Loading..." : "Create Account"} />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Don you have an account? <Link to={"/login"}>Log in &rarr</Link>
            </Switcher>
        </Wrapper>
)};