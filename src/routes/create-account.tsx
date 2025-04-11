import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
    `;

const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;`;

const Input = styled.input`
    margin: 5px 0px 10px 5px;
    padding: 20px 20px;
    border-radius: 50px;
    border: none;
    width: 100%;
    font-size: 16px;
    &[type="submit"]{
        cursor:pointer;
        &:hover{
        opacity: 0.8;
        }
    }
`;

const Error = styled.span`
    font-weight: 600;
    color: tomato;
`;

const Title = styled.h1`
    font-size: 45px`;

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
        if (isLoading || name === "" || email === "" || password === "")return; //로딩 중이거나 3 항목 중 하나라도 비었을 때, 프로세스 종료
        try {
            const credentials = await createUserWithEmailAndPassword(auth, email, password);
            console.log(credentials.user);
            await updateProfile(credentials.user, {
                displayName: name,
            }); 
            navigate("/");
        } catch (e) {
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
        </Wrapper>
)};