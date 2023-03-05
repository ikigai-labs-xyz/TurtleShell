import { useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { Outlet } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const processSteps = [
  {
      title: 'Choose Smart Contract',
      path: '/new-audit/choose',
  },
  {
      title: 'Initialize Audit',
      path: '/new-audit/initialize-audit/'
  },
  {
    title: 'Mint Proof-of-Audit',
    path: '/new-audit/mint-proof',
  },
  {
      title: 'View Full Audit',
  },
];

const AuditLayout = () => {
  let location = useLocation();

  const isCurrentUrl = (url) => {
    return location.pathname.includes(url);
  }

  return (
    <div>
      <h1 className="header">New Audit</h1>
      <Breadcrumbs list={processSteps} activeItem={processSteps.find(step => step.path && isCurrentUrl(step.path)).title} />
      <div className='mt-14 mb-14'>
          <Outlet />
      </div>
    </div>
  )
};

export default AuditLayout;