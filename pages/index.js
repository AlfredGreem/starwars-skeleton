import styled from 'styled-components'
import Head from 'next/head'
import { useState } from 'react';
import Character from '../components/character';

export default function characters({ characters }) {

  const [value, setValue] = useState(12);

  const handleShowMore = () => {
    setValue(value + 12);
  }

  console.log(characters);

  return (
    <>
      <Head>
        <title>Star Wars Characters</title>
      </Head>
      <HomeScreenContainer>
        <StarfieldLeft />
        <CharactersContaner>
          {characters.filter((character) => character.id !== 28 && character.id !== 77)
            .map(
              (character, index) =>
                index < value && (
                  <Character character={character} key={character.id} />
                )
            )}
        </CharactersContaner>
        {value < characters.length && (
          <ShowMoreButton onClick={handleShowMore}>Show more</ShowMoreButton>
        )}
        <StarfieldRight />
      </HomeScreenContainer>
    </>
  )
}

export async function getStaticProps() {

  const characters = await fetch(
    "https://akabab.github.io/starwars-api/api/all.json"
  ).then((res) => res.json());

  return {
    props: {
      characters,
    },
  };

}

const HomeScreenContainer = styled.div``
const CharactersContaner = styled.div`
  display: flex;
  margin-top: 50px;
  padding: 30px;
  justify-content: center;
  gap: 25px;
  flex-wrap: wrap;
  background: #151515;
`
const Starfield = styled.div`
  position: fixed;
  width: 200px;
  top: 0;
  background-repeat: repeat-y;
`
const StarfieldLeft = styled(Starfield)`
  left: 0;
  height: 1700px;
  background-position: left center;
  background-size: 100% auto;
  background-image: url(https://static-mh.content.disney.io/starwars/assets/background/bg_starsL-fd4661a3ccea.jpg);
`
const StarfieldRight = styled(Starfield)`
  right: 0;
  height: 1700px;
  background-position: right center;
  background-size: auto 100%;
  background-image: url(https://static-mh.content.disney.io/starwars/assets/background/bg_starsR-655c85e404d4.jpg);
`
const ShowMoreButton = styled.button`
  color: #aaa;
  background: transparent;
  border: none;
  font-family: inherit;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 40px;
  font-size: 10.4px;
  display: block;
  transition: all 0.3s cubic-bezier(0.175, 0.8, 0.25, 1);
`
