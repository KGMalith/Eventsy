import React from 'react';

import CreateConference from '../usersViews/company-users/editor/conference/create conference';
import ViewPendingConferences from '../usersViews/company-users/editor/conference/view pending conference';
import EditPendingConference from '../usersViews/company-users/editor/conference/view pending conference/edit conference';
import ViewConferences from '../usersViews/company-users/editor/conference/view conference';
import EditConference from '../usersViews/company-users/editor/conference/view conference/edit conference';
import CreateSpeaker from '../usersViews/company-users/editor/speakers/create speaker';
import ViewPendingSpeakers from '../usersViews/company-users/editor/speakers/view pending speakers';
import EditPendingSpeaker from '../usersViews/company-users/editor/speakers/view pending speakers/edit speaker';
import ViewSpeakers from '../usersViews/company-users/editor/speakers/view speakers';
import EditSpeaker from '../usersViews/company-users/editor/speakers/view speakers/edit speaker';
import CreatePresentation from '../usersViews/company-users/editor/presentation/create presentation';
import ViewPresentations from '../usersViews/company-users/editor/presentation/view presentations';
import EditPresentation from '../usersViews/company-users/editor/presentation/view presentations/edit presentation';
import ViewPendingPresentations from '../usersViews/company-users/editor/presentation/view pending presentations';
import EditPendingPresentation from '../usersViews/company-users/editor/presentation/view pending presentations/edit presentation';
import CreateWorkshop from '../usersViews/company-users/editor/workshop/create workshop';
import ViewPendingWorkshops from '../usersViews/company-users/editor/workshop/view pending workshops';
import EditPendingWorkshop from '../usersViews/company-users/editor/workshop/view pending workshops/edit workshop';
import ViewWorkshops from '../usersViews/company-users/editor/workshop/view workshops';
import EditWorkshop from '../usersViews/company-users/editor/workshop/view workshops/edit workshop';
import ResearchPapers from '../usersViews/company-users/reviewer/research papers';
import ViewResearchPaper from '../usersViews/company-users/reviewer/research papers/view research paper';
import WorkShopProposals from '../usersViews/company-users/reviewer/workshop proposals';
import ViewWorkshopProposal from '../usersViews/company-users/reviewer/workshop proposals/view workshop proposal';
import Dashboard from '../usersViews/company-users/admin/dashboard';
import AddUsers from '../usersViews/company-users/admin/users/add users';
import ViewUsers from '../usersViews/company-users/admin/users/view users';
import AdminViewConferences from '../usersViews/company-users/admin/conferences/view conferences';
import AdminViewConference from '../usersViews/company-users/admin/conferences/view conferences/view conference';
import ViewRequestedConferences from '../usersViews/company-users/admin/conferences/view requested conferences';
import ViewRequestedConferece from '../usersViews/company-users/admin/conferences/view requested conferences/view requested conference';
import AdminViewPresentations from '../usersViews/company-users/admin/presentations/view presentations';
import AdminViewPresentation from '../usersViews/company-users/admin/presentations/view presentations/view presentation';
import ViewRequestedPresentations from '../usersViews/company-users/admin/presentations/view requested presentations';
import ViewRequestedPresentation from '../usersViews/company-users/admin/presentations/view requested presentations/view requested presentation';
import ViewRequestedSpeakers from '../usersViews/company-users/admin/speakers';
import AdminViewWorkshops from '../usersViews/company-users/admin/workshops/view workshops';
import AdminViewWorkshop from '../usersViews/company-users/admin/workshops/view workshops/view workshop';
import ViewRequestedWorkshops from '../usersViews/company-users/admin/workshops/view requested workshop';
import ViewRequestedWorkshop from '../usersViews/company-users/admin/workshops/view requested workshop/view requested workshop';
import UserProfile from '../usersViews/common-views/user profile';
import ConferencePreview from '../usersViews/common-views/conference preview';
import ViewPendingWorkshopRequests from '../usersViews/company-users/editor/workshop/viewPendingRequests';


const routes = [
    { path: '/app/profile', component:  UserProfile , exact: true },
    { path: '/app/editor-create-conference', component: CreateConference, exact: true },
    { path: '/app/editor-pending-conferences', component: ViewPendingConferences , exact: true },
    { path: '/app/editor-pending-conferences/:id', component:  EditPendingConference , exact: true },
    { path: '/app/view-conference-preview/:id', component: ConferencePreview, exact: true },
    { path: '/app/editor-conferences', component:  ViewConferences , exact: true },
    { path: '/app/editor-conferences/:id', component: EditConference , exact: true },
    { path: '/app/editor-create-speaker', component: CreateSpeaker , exact: true },
    { path: '/app/editor-pending-speakers', component:  ViewPendingSpeakers , exact: true },
    { path: '/app/editor-pending-speakers/:id', component:  EditPendingSpeaker , exact: true },
    { path: '/app/editor-speakers', component:  ViewSpeakers , exact: true },
    { path: '/app/editor-speakers/:id', component: EditSpeaker , exact: true },
    { path: '/app/editor-create-presentation', component:  CreatePresentation , exact: true },
    { path: '/app/editor-view-pending-presentations', component: ViewPendingPresentations , exact: true },
    { path: '/app/editor-view-pending-presentations/:id', component:  EditPendingPresentation , exact: true },
    { path: '/app/editor-view-presentations', component:  ViewPresentations , exact: true },
    { path: '/app/editor-view-presentations/:id', component:  EditPresentation , exact: true },
    { path: '/app/editor-view-requested-workshops', component: ViewPendingWorkshopRequests, exact: true },
    { path: '/app/editor-create-workshop', component:  CreateWorkshop , exact: true },
    { path: '/app/editor-view-workshops', component: ViewWorkshops , exact: true },
    { path: '/app/editor-view-workshops/:id', component: EditWorkshop , exact: true },
    { path: '/app/editor-view-pending-workshops', component:  ViewPendingWorkshops , exact: true },
    { path: '/app/editor-view-pending-workshops/:id', component: EditPendingWorkshop , exact: true },
    { path: '/app/reviewer-view-research-papers', component: ResearchPapers , exact: true },
    { path: '/app/reviewer-view-research-papers/:id', component: ViewResearchPaper , exact: true },
    { path: '/app/reviewer-view-workshop-proposals', component: WorkShopProposals , exact: true },
    { path: '/app/reviewer-view-workshop-proposals/:id', component:  ViewWorkshopProposal , exact: true },
    { path: '/app/admin-dashboard', component: Dashboard , exact: true },
    { path: '/app/admin-add-users', component: AddUsers , exact: true },
    { path: '/app/admin-view-users', component:  ViewUsers , exact: true },
    { path: '/app/admin-view-conferences', component:  AdminViewConferences , exact: true },
    { path: '/app/admin-view-conferences/:id', component:  AdminViewConference , exact: true },
    { path: '/app/admin-view-requested-conferences', component:  ViewRequestedConferences , exact: true },
    { path: '/app/admin-view-requested-conferences/:id', component:  ViewRequestedConferece , exact: true },
    { path: '/app/admin-view-presentations', component:  AdminViewPresentations , exact: true },
    { path: '/app/admin-view-presentations/:id', component:  AdminViewPresentation , exact: true },
    { path: '/app/admin-view-requested-presentations', component: ViewRequestedPresentations, exact: true },
    { path: '/app/admin-view-requested-presentations/:id', component: ViewRequestedPresentation, exact: true },
    { path: '/app/admin-view-requested-speakers', component: ViewRequestedSpeakers , exact: true },
    { path: '/app/admin-view-workshops', component: AdminViewWorkshops , exact: true },
    { path: '/app/admin-view-workshops/:id', component: AdminViewWorkshop , exact: true },
    { path: '/app/admin-view-requested-workshops', component: ViewRequestedWorkshops, exact: true },
    { path: '/app/admin-view-requested-workshops/:id', component: ViewRequestedWorkshop, exact: true },
];

export default routes;

