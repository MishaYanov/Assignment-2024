/**
 * this function is used to verify the domain name integrity
 * it takes a domain name as a string and returns the domain name if it is valid
 * and handles cleanups like removing the protocol and www from the domain name
 * 
 * @param domain 
 * @returns string | boolean
 */
export function verifyDomainNameIntegrity(domain: string) {
  const strippedUrl = domain.replace(/^(https?:\/\/)?(www\.)?/, '');

  // Step 2: Validate and capture the domain/subdomain.TLD
  const regex = /^(?!-)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;
  
  if (regex.test(strippedUrl)) {
    return strippedUrl;
  } else {
    return false;
  }
}