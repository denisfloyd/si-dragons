import { clearToastMessage } from '@/store/modules/messages/actions'
import { IToastMessage } from '@/store/modules/messages/types'
import React, { useEffect } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'
import { useDispatch } from 'react-redux'

import { Container } from './styles'

interface ToastProps {
  message: IToastMessage
  style: object
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
}

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearToastMessage({
        id: message.id
      }))
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [message.id])

  const handleRemoveToastContainter = (toastId: string) => {
    dispatch(clearToastMessage({
      id: toastId
    }))
  }

  return (
    <Container
      type={message.type}
      $hasDescription={Number(!!message.description)}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => handleRemoveToastContainter(message.id)} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  )
}

export default Toast
