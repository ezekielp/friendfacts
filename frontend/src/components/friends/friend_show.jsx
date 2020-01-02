import React from 'react';
import NavbarContainer from '../nav/navbar_container';
import FriendsSidebar from './friends_sidebar';

class FriendShow extends React.Component {
    constructor(props) {
        super(props);

        this.renderAge = this.renderAge.bind(this);
        this.renderBirthday = this.renderBirthday.bind(this);
        this.renderCurrentCity = this.renderCurrentCity.bind(this);
        this.renderHobbies = this.renderHobbies.bind(this);
        this.renderSiblings = this.renderSiblings.bind(this);
    }

    componentDidMount() {
        this.props.fetchFriend(this.props.match.params.friendId);
    }

    renderAge() {
        const { friend } = this.props;

        let ageFromDOB = DOB => {
          const yearsOldInMilliseconds = Date.now() - DOB.getTime();
          const yearsOldInSeconds = yearsOldInMilliseconds / 1000;
          const yearsOldInMinutes = yearsOldInSeconds / 60;
          const yearsOldInHours = yearsOldInMinutes / 60;
          const yearsOldInDays = yearsOldInHours / 24;
          return Math.floor(yearsOldInDays / 365);
        };

        let ageLi = <></>;
        if (friend.dateOfBirth) {
          ageLi = (
            <li className="friend-show-li">
              <div className="friend-show-tag friend-show-age-tag">age</div>
              <div className="friend-show-text">
                {ageFromDOB(new Date(friend.dateOfBirth))} years old
              </div>
            </li>
          );
        }
        return ageLi;        
    }

    renderBirthday() {
      const { friend } = this.props;

      let birthdayLi = <></>;
      if (friend.dateOfBirth) {
        const { dateOfBirth } = friend;
        const DOB = new Date(dateOfBirth);
        const dateOptions = { month: 'long' };
        const birthMonth = new Intl.DateTimeFormat('en-US', dateOptions).format(DOB);
        const birthDay = DOB.getUTCDate();
        const birthYear = DOB.getUTCFullYear();

        birthdayLi = (
          <li className="friend-show-li">
            <div className="friend-show-tag friend-show-birthday-tag">birthday</div>
            <div className="friend-show-text">
              {birthMonth} {birthDay}, {birthYear}
            </div>
          </li>
        );
      }

      return birthdayLi;
    }

    renderCurrentCity() {
        const { friend } = this.props;

        let currentCityYears = <></>;
        if (friend.currentCityYears) {
          const getYearFromCurrentCityYears = numYears => {
            const currentDate = new Date();
            return currentDate.getUTCFullYear() - numYears;
          };
          currentCityYears = (
            <span>
              (since around{" "}
              {getYearFromCurrentCityYears(friend.currentCityYears)})
            </span>
          );
        }

        let currentCityLi = <></>;
        if (friend.currentCity) {
          currentCityLi = (
            <li className="friend-show-li">
              <div className="friend-show-tag friend-show-location-tag">location</div>
              <div className="friend-show-text">Lives in <span>{friend.currentCity} </span>
              {currentCityYears}</div>
            </li>
          );
        }
        
        return currentCityLi;
    }

    renderSiblings() {
        const { friend } = this.props;

        let siblingsLi = <></>;
        if (friend.siblings[0] !== "") {
            let { siblings } = friend;
            let siblingsText;
            if (siblings.length === 1) {
                siblingsText = siblings;
            } else if (siblings.length === 2) {
                siblingsText = siblings.join(" and ");
            } else {
                siblingsText = siblings.slice(0, siblings.length - 1).join(", ") + " and " + siblings[siblings.length - 1];
            }
            siblingsLi = (
              <li className="friend-show-li">
                <div className="friend-show-siblings-tag friend-show-tag">
                  siblings
                </div>
                <div className="friend-show-text">{siblingsText}</div>
              </li>
            );
        }
        return siblingsLi;
    }

    renderHobbies() {
      const { friend } = this.props;

      let hobbiesLi = <></>;
      if (friend.hobbies[0] !== "") {
        const { hobbies } = friend;
        const hobbiesText = hobbies
          .map(hobby => {
            return (
              hobby.slice(0, 1).toUpperCase() + hobby.slice(1).toLowerCase()
            );
          })
          .join("  |  ");
        hobbiesLi = (
          <>
            <hr className="friend-show-divider-line"/>
            <li className="friend-show-li">
              <div className="friend-show-hobbies-tag friend-show-tag">
                hobbies
              </div>
              <div className="friend-show-text">{hobbiesText}</div>
            </li>
          </>
        );
      }

      return hobbiesLi;
    }

    render() {

        if (!this.props.friend) return null;

        const { friend } = this.props;
        
        return (
          <div>
            <NavbarContainer />
            <div className="friends-below-navbar-container">
              <FriendsSidebar />
              <div className="friend-show-container">
                <ul>
                  <li id="friend-show-name-text">{friend.name}</li>
                  {this.renderAge()}
                  {/* <hr className="friend-show-divider-line"/> */}
                  {this.renderBirthday()}
                  {/* <hr className="friend-show-divider-line"/> */}
                  {this.renderCurrentCity()}
                  {/* <hr className="friend-show-divider-line"/> */}
                  {this.renderSiblings()}
                  {this.renderHobbies()}
                </ul>
              </div>
            </div>
          </div>
        );
    }
}

export default FriendShow;