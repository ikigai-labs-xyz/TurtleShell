import { Mint as MintEvent, Minted as MintedEvent } from "../generated/TurtleShellToken/TurtleShellToken"
import { AuditBadge } from "../generated/schema"

export function handleMinted(event: MintedEvent): void {
	const id = event.params.owner
	let auditBadge = AuditBadge.load(id)
	if (!auditBadge) {
		auditBadge = new AuditBadge(id)
		auditBadge.tokenId = event.params.tokenId
		auditBadge.contractAddress = event.params.owner
		auditBadge.initiator = event.transaction.from
	}
	auditBadge.save()
}
