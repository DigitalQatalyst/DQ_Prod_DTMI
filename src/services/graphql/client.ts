// Simple GraphQL client without mock data dependencies

const mockGraphQLClient = {
  request: async (query: string, variables: any = {}) => {
    // Return empty data since we removed mock data
    return getMockResponse(query, variables);
  },
};

// Expose as graphqlClient for backward compatibility
export const graphqlClient = mockGraphQLClient;

// Fallback function that returns empty data
export const getMockResponse = (
  queryName: string,
  variables: any,
  marketplaceType?: string
) => {
  // Return empty responses since we removed all mock data
  if (queryName.includes("getItems")) {
    return { items: [] };
  }
  if (queryName.includes("getItemDetails")) {
    return { item: null };
  }
  if (queryName.includes("getRelatedItems")) {
    return { relatedItems: [] };
  }
  if (queryName.includes("getFilterOptions")) {
    return { filterOptions: { categories: [], providers: [] } };
  }
  if (queryName.includes("getProviders")) {
    return { providers: [] };
  }
  
  // Default empty response
  return {};
};