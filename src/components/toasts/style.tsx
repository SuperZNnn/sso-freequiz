import styled from "styled-components";

export const ToastContainerStyle = styled.section`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 45vh;
    z-index: 5;
    
    .toast{
        width: 90%;
        height: 7.5vh;
        position: relative;
        left: 50%;
        transform: translate(-50%);
        margin-top: 1vh;
        border-radius: 1vh;
        animation: toastShow .5s ease-in-out forwards;
        &.hide{
            animation: toastHide .5s ease-in-out forwards;
        }

        p{
            font-family: 'Inter', sans-serif;
            color: #fff;
            font-size: .8rem;
            text-align: center;
            position: relative;
            left: 50%;
            transform: translate(-50%);
            top: 1vh;
            height: 4.5vh;
        }

        button{
            position: absolute;
            top: .5vh;
            right: .5vh;
            padding: .25vh .5vh;
            border: .3vh solid #fff;
            background-color: transparent;
            border-radius: .5vh;

            font-family: 'Inter', sans-serif;
            color: #fff;
            z-index: 1;

            transition: .2s;
            cursor: pointer;

            &:hover{
                background-color: #fff;
                color: #000;
            }
        }

        .load-bar{
            width: 90%;
            position: relative;
            left: 50%;
            transform: translate(-50%);
            height: .5vh;
            background-color: rgba(0, 0, 0,.3);
            border-radius: .5vh;
            top: 1.5vh;
            overflow: hidden;

            .load{
                width: 0%;
                height: .5vh;
                background-color: rgba(0, 0, 0,.5);
                border-radius: .5vh;
                animation: loadbar var(--time) ease-in-out forwards;
            }
        }
    }
`