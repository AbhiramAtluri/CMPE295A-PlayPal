import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined)
  const [currentUserImage, setCurrentUserImage] = useState(true)
  const [currentSelected, setCurrentSelected] = useState(undefined)
  useEffect(() => {
    const load = async () => {
      const data = await JSON.parse(sessionStorage.getItem('details'))
      setCurrentUserName(data.firstname)
    }
    load()
  }, [])
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index)
    changeChat(contact)
  }
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <img src={'./images/logo.png'}></img>
            {/* <h4>PlayPal</h4> */}
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact.email}
                  className={`contact ${
                    index === currentSelected ? 'selected' : ''
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  {/* <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div> */}
                  <div className="username">
                    <h5>{contact.firstname + ' ' + contact.lastname}</h5>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="current-user">
            {/* <div className="avatar"> */}
            {/* <img
                // src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              /> */}
            {/* </div> */}
            <div
              className="username"
              style={{
                display: 'flex',
                gap: '0.5rem',
              }}
            >
              <div>
                <h5>Current User : </h5>
              </div>
              <div>
                <h5>{currentUserName}</h5>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 82% 8%;
  overflow: hidden;
  // background-color: black;
  .brand {
    display: flex;
    align-items: center;
    text-align: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h4 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.3rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1.15rem;
      }
    }
    .contact {
      // background-color: #ffffff34;
      background-color: black;
      min-height: 4rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.5rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h5 {
          color: white;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    // background-color: #0d0d30;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h5 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`
