import styled from "styled-components";

export const RegisterPageCotainer = styled.main`
    width: 100%;
    height: 100vh;
    background-color: #dadada;

    display: flex;
    justify-content: center;
    align-items: center;

    h2{
        font-family: 'Bangers', sans-serif;
        margin-bottom: 1vh;
    }
    h3{
        font-family: 'Inter', sans-serif;
        font-size: 1rem;
        text-align: right;
        cursor: pointer;

        span{
            text-decoration: underline;
        }
    }

    form{
        width: 45vh;
        display: flex;
        justify-content: center;
        flex-direction: column;

        button.register{
            padding: 1vh;
            font-family: 'Inter', sans-serif;
            background-color: #406f9a;
            border-radius: 1vh;
            border: .3vh solid #000;
            margin-top: 1vh;
            font-size: 1rem;
            transition: .2s;
            cursor: pointer;

            &:hover{
                box-shadow: 5px 5px 0px rgba(0,0,0,.3);
            }
        }

        .input-group{
            height: 11vh;
            width: 45vh;

            .code-confirm{
                display: flex;
                gap: 1vh;

                button{
                    border-radius: 1vh;
                    background-color: #999999;
                    border: .3vh solid #000;
                    transition: .2s;
                    cursor: pointer;

                    &:hover{
                        box-shadow: 5px 5px 0px rgba(0,0,0,.3);
                    }
                }
            }

            input{
                width: 45vh;
                box-sizing: border-box;
                padding: 1vh;
                border-radius: 1vh;
                border: .3vh solid #000;
                background-color: #dadada;
                font-family: 'Inter', sans-serif;
                transition: .2s;

                &:focus{
                    outline: none;
                    box-shadow: 5px 5px 0px rgba(0,0,0,.3);
                }
            }

            input.half{
                width: 29vh
            }
            button.half{
                width: 15vh
            }

            .see{
                display: flex;
                gap: 1vh;

                input[type=checkbox]{
                    display: none
                }
                label {
                    display: inline-block;
                    width: 5vh;
                    height: 5vh;
                    background-color: #dadada;
                    border: .3vh solid #000;
                    border-radius: 1vh;
                    cursor: pointer;
                    transition: background-color 0.3s, border-color 0.3s;
                    overflow: hidden;
                }
                label::after{
                    content: '😄';
                    color: white;
                    font-size: 4vh;
                    display: block;
                    text-align: center;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transform: translate(0vh,-.7vh)
                }
                input[type="checkbox"]:checked + label {
                    background-color: #406f9a;
                    border-color: #406f9a;
                }
                input[type="checkbox"]:checked + label::after {
                    content: '😃';
                }
            }

            p{
                width: 45vh;
                text-align: center;
                font-family: 'Inter', sans-serif;
                font-size: .9rem;

                @media (max-width: 730px){
                    font-size: .7rem;
                }
            }
        }
    }
`