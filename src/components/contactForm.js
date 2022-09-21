import React from 'react'

const ContactForm = (props) => {
  console.log(props)
  return (
    <form onSubmit={props.add}>
      <input value={props.name} onChange={props.nameInput} />
      <input value={props.number} onChange={props.numberInput} />
      <button type='submit'>Add</button>
    </form>
  )
}

export default ContactForm

