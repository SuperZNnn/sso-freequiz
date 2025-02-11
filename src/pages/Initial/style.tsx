import styled from "styled-components";

export const FormContainer = styled.main`
    background-image: url("/assets/images/bg.jpeg");
    width: 100%;
    height: 100vh;
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    section{
        background-color: rgba(218, 218, 218, .7);
        width: 45vh;
        height: 70vh;
        border-radius: 1vh;
        overflow: hidden;
        border: .3vh solid #fff;

        .scroll{
            transition: .5s;
        }

        form{
            height: 70vh;
            padding: 1vh;
            box-sizing: border-box;

            h4{
                font-family: 'Bangers', serif;
                font-size: 1.9rem;
                text-align: center;
                /* position: absolute; */
                width: 43vh;
            }

            .buttons-container{
                display: flex;
                gap: 1vh;

                button{
                    width: 20vh;
                    padding: 1vh;
                    border-radius: .5vh;
                    border: .3vh solid #000;
                    font-family: 'Inter', sans-serif;
                    font-weight: 500;
                    cursor: pointer;
                    transition: .2s;
                    
                    &:hover{
                        box-shadow: 5px 5px 0px rgba(0,0,0,.5);
                    }
                    &:active{
                        background: transparent!important;
                    }

                    &:nth-child(1){
                        background-color: var(--thirdColor);

                        &:active{
                            border-color: var(--thirdColor)
                        }
                    }
                    &:nth-child(2){
                        background-color: var(--fourthColor);
                        color: #fff;

                        &:active{
                            border-color: var(--fourthColor)
                        }
                    }
                }
            }

            button:disabled{
                cursor: wait;
            }

            .inputs-container{
                position: relative;
                top: 42.5%;
                transform: translate(0,-50%);

                height: 30vh;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-direction: column;


                h3{
                    font-family: 'Inter', sans-serif;
                    font-size: .7rem;
                    text-align: right;
                    width: 35vh;
                    cursor: pointer;

                    &:hover{
                        text-decoration: underline
                    }
                }

                input{
                    width: 35vh;
                    padding: 1vh;
                    border-radius: 1vh;
                    border: .3vh solid #000;
                    background-color: var(--firstColor);
                    transition: .2s;
                    font-family: 'Inter', sans-serif;

                    &:focus{
                        box-shadow: 5px 5px 0px rgba(0,0,0,.5);
                        outline: none
                    }

                    &::placeholder{
                        color: #000
                    }
                }

                p.error-message{
                    font-family: 'Inter', sans-serif;
                    font-size: .9rem;
                }
            }
        }
    }
`