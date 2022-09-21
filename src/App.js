import { useState } from 'react'
import './App.css'
import ContactForm from './components/contactForm'
import Search from './components/search'
import Contact from './components/Contact'


function App () {
  const [contacts, setContacts] = useState([
    { contactName: 'Jessica', contactNumber: 2345910 },
    { contactName: 'Elvira', contactNumber: 2345910 }
  ])
  const [name, setName] = useState('name...')
  const [number, setNumber] = useState(111111111)
  const [search, setSearch] = useState('')

  const objectEquality = (obj1, obj2) => {
    ///también puedes usar Object.is(obj1,obj2)

    const a = Object.getOwnPropertyNames(obj1) //returns an array with the KEYS of the object
    const b = Object.getOwnPropertyNames(obj2)

    // Check that all keys from both objects match are present on both objects
    //.every check for a condition in every element returns true if all
    // !! its saying return the boolean value of whatever this
    // .find returns the first case that match
    const hasAllKeys = a.every(value => !!b.find(v => v === value))

    if (!hasAllKeys) return false
    for (const key of a) if (obj1[key] !== obj2[key]) return false
    console.log('excution till for')
    return true
  }

  function addContact (event) {
    event.preventDefault()

    let newContact = {
      contactName: name,
      contactNumber: number
    }

    const contactEquality = contacts.find(contact =>
      objectEquality(newContact, contact)
    )

    if (contactEquality) {
      alert(`${newContact.contactName} is already a name!`)
      setName('')
      setNumber(11111111)
    }
    if (!contactEquality) {
      setContacts(contacts.concat(newContact))
      console.log('new contact is ', contacts, 'contact list', contacts)
      setName('')
      setNumber(11111111)
    }

    //los objetos de contacts se comparan con newContact
  }

  const lookSearch = contacts.filter(element =>
    element.contactName.includes(search)
  )
  const beginSearch = search === '' ? contacts : lookSearch

  function nameListener (event) {
    setName(event.target.value)
    console.log('name is', name)
  }

  function numberListener (event) {
    setNumber(event.target.value)
    console.log('number is', number)
  }

  function searchListener (event) {
    setSearch(event.target.value)
    console.log('searching', search)
  }

  return (
    <div className='App'>
      <h2>PhoneBook:</h2>
      <ContactForm name={name} number={number} add={addContact} nameInput={nameListener} numberInput={numberListener} />
      <Search searchInput={search} searchListener={searchListener} />
      <h3>Contacts:</h3>
      <ul>
        {beginSearch.map(contact => (
          <Contact key={contact.contactName} contactElement={contact} />
        ))}
      </ul>
    </div>
  )
}

export default App
