import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';//fa is a specfic library font awesome
import Moment from 'react-moment';

class ListAppointments extends Component {
  render() {
    return (
      <div className="appointment-list item-list mb-3">
        {this.props.appointments.map(item => (// adding a key key={item.aptId}> give each item an aptid
          <div className="pet-item col media py-3" key={item.aptId}>
            <div className="mr-3">
              <button
                className="pet-delete btn btn-sm btn-danger"//(item) temporary generates an item
                onClick={() => this.props.deleteAppointment(item)}>
                <FaTimes />
              </button>
            </div>

            <div className="pet-info media-body">
              <div className="pet-head d-flex">
                <span
                  className="pet-name"
                  contentEditable="true"
                  suppressContentEditableWarning
                  onBlur={e =>
                    this.props.updateInfo(//updates info  
                      'petName',//selected info to update
                      e.target.innerText,
                      item.aptId
                    )
                  }>
                  {item.aptId}--
                  {item.petName}
                </span>
                <span className="apt-date ml-auto">
                  <Moment
                    date={item.aptDate}//moment is a date library code item apt.date is in data.json 
                    parse="YYYY-MM-dd hh:mm"
                    format="MMM-D h:mma"
                  />
                </span>
              </div>

              <div className="owner-name">
                <span className="label-item">Owner: </span>
                <span
                  contentEditable="true"
                  suppressContentEditableWarning
                  onBlur={e =>
                    this.props.updateInfo(
                      'ownerName',
                      e.target.innerText,
                      item.aptId
                    )
                  }>
                  {item.ownerName}
                </span>
              </div>
              <div
                className="apt-notes"
                contentEditable="true"
                suppressContentEditableWarning
                onBlur={e =>
                  this.props.updateInfo(
                    'aptNotes',
                    e.target.innerText,
                    item.aptId
                  )
                }>
                {item.aptNotes}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ListAppointments;
