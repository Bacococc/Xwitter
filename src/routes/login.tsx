import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import { Input, Switcher, Title, Wrapper, Error } from "../components/auth-components";
import GithubButton from "../components/github-button";


export default function CreateAccount(){
    const[isLoading, setLoading] = useState(false);
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[error, setError] = useState("");
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: {name, value} } = e;
        if (name === "email") {
            setEmail(value)
        } else if (name === "password"){
            setPassword(value)
        } 
    }
    //firebase 회원가입 처리
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (isLoading || email === "" || password === "")return; //로딩 중이거나 3 항목 중 하나라도 비었을 때, 프로세스 종료
        try {
            setLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
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
            <Title>Log in to 𝕏</Title>
            <Form onSubmit={onSubmit}>
                <Input name="email" placeholder="Email" type="text" required onChange={onChange}/>
                <Input name="password" 
                    placeholder="Password" 
                    type="password" 
                    required
                    onChange={onChange}
                />
                <Input type="submit" value={isLoading ? "Loading..." : "Log in"} />
            </Form>
            {error !== "" ? <Error>{error}</Error> : null}
            <Switcher>
                Don't have an account? <Link to={"/create-account"}>Create one →</Link>
            </Switcher>
            <GithubButton />
        </Wrapper>
)};