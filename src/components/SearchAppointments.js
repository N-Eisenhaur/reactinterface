import React, { Component } from 'react';

class SearchAppointments extends Component {
  render() {
    return (
      <div className="search-appointments row justify-content-center my-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              id="SearchApts"
              type="text"
              className="form-control"
              aria-label="Search Appointments"
              onChange={e => this.props.searchApts(e.target.value)}//changes the searchapts value when info is entered
            />
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-primary dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Sort by: <span className="caret" />
              </button>

              <div className="sort-menu dropdown-menu dropdown-menu-right">
                <button
                  className={
                    'sort-by dropdown-item ' +
                    (this.props.orderBy === 'petName' ? 'active' : '')
                  }//if petname or other class name is is picked add a class called active
                  onClick={e =>
                    this.props.changeOrder('petName', this.props.orderDir)
                  }
                  href="#"
                >
                  Pet Name
                </button>
                <button
                  className={
                    'sort-by dropdown-item ' +
                    (this.props.orderBy === 'aptDate' ? 'active' : '')
                  }
                  onClick={e =>
                    this.props.changeOrder('aptDate', this.props.orderDir)//every item in the onclick function dropdown must have its class reference in () for instance aptdate for aptdate
                  }
                  href="#"
                >
                  Date
                </button>
                <button
                  className={
                    'sort-by dropdown-item ' +
                    (this.props.orderBy === 'ownerName' ? 'active' : '')
                  }
                  onClick={e =>
                    this.props.changeOrder('ownerName', this.props.orderDir)
                  }
                  href="#"
                >
                  Owner
                </button>
                <div role="separator" className="dropdown-divider" />
                <button
                  className={
                    'sort-by dropdown-item ' +
                    (this.props.orderDir === 'asc' ? 'active' : '')
                  }
                  onClick={e =>
                    this.props.changeOrder(this.props.orderBy, 'asc')//orderby is for asc and dec only it will change the order of the names based on weather asc or dec are selected while the other items will change asc or dec directory based on the selected class name
                  }
                  href="#"
                >
                  Asc
                </button>
                <button
                  className={
                    'sort-by dropdown-item ' +
                    (this.props.orderDir === 'desc' ? 'active' : '')
                  }
                  onClick={e =>
                    this.props.changeOrder(this.props.orderBy, 'desc')
                  }
                  href="#"
                >
                  Desc
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchAppointments;
