import { styled } from "styled-components";

export const Wrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 420px;
    padding: 50px 0px;
    `;

export const Form = styled.form`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;`;

export const Input = styled.input`
    margin: 15px 0px 0px 0px;
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

export const Error = styled.span`
    margin: 18px 0px 18px 0px;
    font-size: 15px;
    font-weight: 600;
    color: tomato;
`;

export const Switcher = styled.span`
    margin-top: 20px;
    a {
        color: #1d9bf0;
    }
`;

export const Title = styled.h1`
    margin: 20px 0 20px 0;
    font-size: 45px`;