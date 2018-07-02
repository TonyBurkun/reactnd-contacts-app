import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


class ListContacts extends Component {

    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {
            query: ''
        }
    }

    updateQuery = (query) => {
        this.setState(() => ({
            query: query.trim()

        }))
    };

    clearQuery = () => {
      this.updateQuery('');
    };

    render() {

        const {query} = this.state;
        const {contacts, onDeleteContact} = this.props;

        const showingContacts = query === ''
            ? contacts
            : contacts.filter((contact) => (
                contact.name.toLowerCase().includes(query.toLowerCase())
            ));

        return (
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input
                        className="search-contacts"
                        type="text"
                        placeholder="Serarch Contacts"
                        value={query}
                        onChange={(event) => {
                            this.updateQuery(event.target.value)
                        }}
                    />
                    <Link
                        to="/create"
                        className="add-contact"
                    >Create contact</Link>
                </div>

                {contacts.length !== showingContacts.length &&(
                  <div className="showing-contacts">
                      <span>Now showing  {showingContacts.length} of {contacts.length}</span>
                      <button onClick={this.clearQuery}>Show all</button>
                  </div>
                )}

                <ol className="contact-list">
                    {showingContacts.map(contact => (
                        <li key={contact.id} className="contact-list-item">
                            <div
                                className="contact-avatar"
                                style={{
                                    backgroundImage: `url(${contact.avatarURL})`
                                }}
                            >
                            </div>
                            <div className="contact-details">
                                <p>{contact.name}</p>
                                <p>{contact.handle}</p>
                            </div>
                            <button
                                onClick={() => onDeleteContact(contact)}
                                className="contact-remove"
                            >
                                Remove
                            </button>

                        </li>
                    ))}
                </ol>


            </div>
        )
    }

}

export default ListContacts