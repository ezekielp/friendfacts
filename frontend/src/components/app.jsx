import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';

import LandingPage from './landing_page/landing_page';
import FriendsIndex from './friends/friends_index';
import CreateFriendContainer from './friends/create_friend_container';
import EditFriendContainer from './friends/edit_friend_container';
import FriendsIndexContainer from './friends/friends_index_container';
import FriendShowContainer from './friends/friend_show_container';
import Modal from './modal/modal';

const App = () => (
    <>
        <Modal />
        <Switch>
            <Route path="/friends/:friendId/edit" component = {EditFriendContainer} />
            <Route path="/friends/new" component = {CreateFriendContainer} />
            <Route exact path="/friends" component={FriendsIndexContainer} />
            {/* <ProtectedRoute exact path="/friends" component={FriendsIndex} /> */}
            <Route exact path="/friends/dummy_show" component={FriendShowContainer} />
            <AuthRoute path="/" component={LandingPage} />
        </Switch>
    </>
);

export default App;