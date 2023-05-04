import { gql, useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client"
import { useLocation, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import style from "./Chat.module.css"
import { useState } from "react"
import Cookies from "js-cookie"

import { InsertChat } from "../../Graphql/mutation"

import { AiOutlineClose } from "react-icons/ai"

const SubscriptionChat = gql `
subscription MySubscription($_eq: Int!) {
  sekargaluhetnic_chat(where: {pesanan_pakaian_id: {_eq: $_eq}}) {
    id
    message
    pesanan_pakaian_id
    user_id
  }
}
`; 

export const Chat = ({id, popUp, chatModal}) => {

  console.log("cek item", id)
  console.log("cek popup", popUp)
  console.log("cek chatmodal", chatModal)

  const LoggedIn = Cookies.get("token")

  const [message, setMessage] = useState("")

  const handleChangeMessage = (e) => {
    setMessage(e.target.value)
  }
  console.log("cek message", message)
  
  // const location = useLocation()
  // const { id } = location.state
  // console.log("cek state", location.state)
  // const navigate = useNavigate()

  const {data: dataChat, loading: loadingChat, error:errorChat} = useSubscription(SubscriptionChat, {variables: { _eq: id}})
  console.log("cek data chat", dataChat)

  const [insertChat, {loading: loadingInsertChat}] = useMutation(InsertChat)

  // const {insertChat, loadingInsertChat} = useInsertChat()
  const sendChat = (e) => {
    e.preventDefault()
    if(LoggedIn) {
      insertChat({
        variables: {
          object: {
            pesanan_pakaian_id : id,
            user_id : "ADMIN",
            message : message
          }
        }
      })
    }
    setMessage("")
  }


  

    return (
        <div className={style.chat}>
          <div>
            <div>
              <div className="border-b mb-3 pl-2 flex justify-between">
                <div>
                  <h6>SekarGaluhEtnic</h6>
                  <p className="mb-2">Admin</p>
                </div>
                <div className="p-1">
                  <AiOutlineClose onClick={popUp} className="w-5 h-5 fill-secondary hover:fill-red-800 cursor-pointer"/>
                </div>
              </div>
              <div className="h-96">
                {dataChat?.sekargaluhetnic_chat?.map((el) => 
                  <div className={el.user_id == Cookies.get("okogaye") ? "bg-secondary text-white px-3 py-2 w-3/4 flex justify-end mb-1 ml-auto mr-0 rounded-tl-xl rounded-bl-xl rounded-br-xl" : "bg-secondary3 text-primary px-3 py-2 w-3/4 flex justify-start mb-1 ml-0 mr-auto rounded-tr-xl rounded-bl-xl rounded-br-xl"}>
                    <p className="m-0  font-light text-sm">{el.message}</p>
                  </div>
                )}
              </div>
              <div className="border-t px-2 py-2">
                <form onSubmit={sendChat}>
                  <input className="border-b w-10/12 px-1 py-[6px] focus:outline-none text-sm focus:border-b-primary" id="message" onChange={handleChangeMessage} type="text" name="message" placeholder="Ketik disini . . . . " value={message} ></input>
                  <button className="bg-secondary w-2/12 px-1 py-2 text-white rounded-r-md text-xs hover:bg-secondary2 duration-200" type="submit">
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
      </div>
    )

}