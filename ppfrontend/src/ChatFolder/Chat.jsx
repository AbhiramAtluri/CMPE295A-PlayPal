import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { io } from 'socket.io-client'
import styled from 'styled-components'
import ChatContainer from './ChatContainer'
import NavBar from '../NavBar'
import Contacts from './Contacts'
import Welcome from './Welcome'

export default function Chat() {
  const navigate = useNavigate()
  const socket = useRef()
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)
  const [currentUser, setCurrentUser] = useState(undefined)

  useEffect(() => {
    const load = async () => {
      let details = JSON.parse(sessionStorage.getItem('details'))
      setCurrentUser(details)
    }
    load()
  }, [])

  useEffect(() => {
    if (currentUser) {
      socket.current = io('http://localhost:8080/')
      socket.current.emit('add-user', currentUser.email)
    }
  }, [currentUser])

  useEffect(() => {
    const load = async () => {
      if (currentUser) {
        axios
          .post('http://localhost:8080/chat/getAllContacts', {
            email: currentUser.email,
          })
          .then((res) => {
            setContacts(res.data.contacts)
          })
      }
    }
    load()
  }, [currentUser])

  const handleChatChange = (chat) => {
    setCurrentChat(chat)
  }
  return (
    <>
      <NavBar></NavBar>
      <Container>
        <div className="container">
          <Contacts
            contacts={contacts}
            changeChat={handleChatChange}
            style={{ 'background-color': 'rgb(74 148 166)' }}
          />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 1rem;
  align-items: center;
  background: linear-gradient(
    #009688 0%,
    #009688 130px,
    #d9dbd5 50%,
    #d9dbd5 50%
  );
  background-color: rgb(77 147 180);
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #223d56;
    border-radius: 5px;
    display: grid;
    grid-template-columns: 30% 70%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`
