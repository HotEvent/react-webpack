import { useQuery, gql } from '@apollo/client';
import React from 'react';
const EXCHANGE_RATES = gql`
{
    allTodos {
      nodes {
        id
        task
        done
        due
      }
    }
  }
`;

export default function Foo() {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.allTodos.nodes.map(({ id, task, done }) => (
        <div key={id}>
            <p>
                {task}:ff
            </p>
        </div>
    ));
}