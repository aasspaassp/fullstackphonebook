import React from 'react'

const Contact = (props) => {
  return (
    <li >
      Name: {props.contactElement.contactName} Number: {props.contactElement.contactNumber}
    </li>
  )
}

export default Contact
