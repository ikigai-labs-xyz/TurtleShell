import { gql } from '@apollo/client';
// graphql query to get audit badges

export const GET_AUDIT_BADGES = gql`
  query GetAuditBadges($initiator: String!) {
    auditBadges(
      where: {initiator: $initiator}
    ) {
      contractAddress
      id
      tokenId
    }
  }
`;

export const GET_ALL_AUDIT_BADGES = gql`
  query GetAllAuditBadges {
    auditBadges {
      tokenId
    }
  }
`;