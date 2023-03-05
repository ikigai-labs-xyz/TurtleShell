import { useEffect } from 'react'
import { useQuery } from '@apollo/client';
import { GET_AUDIT_BADGES } from '../../graphql/auditBadges';
import AuditContainer from './AuditContainer';


const Audits = ({ address }) => {
  const { loading, error, data } = useQuery(GET_AUDIT_BADGES, {
    variables: { initiator: address },
  });

  return (
    <div>
      <>
        {
          data && data.auditBadges.map((auditBadge, index) => {
            return (
              <AuditContainer key={auditBadge.id | index} auditBadge={auditBadge} address={address} />
            )
          }
          )
        }
      </>
    </div>
  )
}

export default Audits;