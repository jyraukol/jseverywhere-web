import { gql, useMutation } from '@apollo/client';
import React, { useEffect } from 'react';
import NoteForm from '../components/NoteForm';

import { GET_MY_NOTES, GET_NOTES } from '../gql/query';
const NEW_NOTE = gql`
  mutation newNote($content: String!) {
    newNote(content: $content) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
      }
    }
  }
`;

const NewNote = props => {
  useEffect(() => {
    document.title = 'New Note - Notedly';
  }, []);
  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{ query: GET_NOTES }, { query: GET_MY_NOTES }],
    onCompleted: data => {
      props.history.push(`note/${data.newNote.id}`);
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return <NoteForm action={data} />;
};

export default NewNote;
