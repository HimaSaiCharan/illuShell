//How many individuals are currently employed?
export const employedIndividualsCount = function (data) {
  return data.filter((person) => person.employed).length;
};

//How many data own a car?
export const carOwnerCount = function (data) {
  return data.filter((person) => person.vehiclesOwned.includes("car")).length;
};

// How many pets are fully vaccinated?
const getPets = (person) => person.pets;

const isPetFullyVaccinated = (pet) => pet.fullyVaccinated;

export const fullyVaccinatedPetsCount = function (data) {
  return data.flatMap(getPets).filter(isPetFullyVaccinated).length;
};

//What are the names of all the pets, and what type of animal is each?
const nameAndTypeOfPet = (pet) => {
  return { petName: pet.name, petType: pet.type };
};

export const namesAndTypesOfPets = function (data) {
  return data.flatMap(getPets).map(nameAndTypeOfPet);
};

//Which cities do the individuals live in?
export const citiesOfIndividuals = function (data) {
  return data.map((person) => person.livesIn);
};

//How many hobbies are shared across the group? What are they?
const gethobbiesType = (hobby) => hobby.type;

const getHobbies = (person) => person.hobbies;

export const alldataHobbies = function (data) {
  const allHobies = data.flatMap(getHobbies).map(gethobbiesType);

  return { totalHobbies: allHobies.length, hobbies: allHobies };
};

//How many pets belong to data who are currently unemployed?
const add = (value1, value2) => value1 + value2;

const petsCount = (person) => person.pets.length;

const unemployeddata = (person) => !person.employed;

export const petsCountOfUnempolyed = function (data) {
  return data.filter(unemployeddata).map(petsCount).reduce(add, 0);
};

//What is the average age of the individuals mentioned in the passage?
const getAges = (person) => person.age;

export const averageAgeOfIndividuals = function (data) {
  const sumOfAges = data.map(getAges).reduce(add, 0);

  return sumOfAges / data.length;
};

// How many individuals have studied computer science, and how many of them have pets?
const didPersonStudiedCSAndHasPet = function (person) {
  return person.degree.includes("computer science") && person.pets.length !== 0;
};

export const csStudiedPetOwnersCount = function (data) {
  return data.filter(didPersonStudiedCSAndHasPet).length;
};

//How many individuals own more than one pet?
export const multiplePetsOwnersCount = function (data) {
  return data.filter((person) => person.pets.length > 1).length;
};

//Which pets are associated with specific favorite activities?
const petNameAndFavActivites = (pet) => {
  return { petName: pet.name, petFavActivies: pet.favActivites };
};

export const petFavAcitives = function (data) {
  return data.flatMap(getPets).map(petNameAndFavActivites);
};

//What are the names of all animals that belong to data who live in Bangalore or Chennai?
const isFromBangaloreOrChennai = function (person) {
  return person.livesIn === "Bangalore" || person.livesIn === "Chennai";
};

const getPetsNames = (person) => person.pets.map((pet) => pet.name);

export const petNamesFromSpecificRegion = function (data) {
  return data.filter(isFromBangaloreOrChennai).flatMap(getPetsNames);
};

// How many vaccinated pets belong to data who do not own a car?
const nonCarOwnerdata = (person) => !person.vehiclesOwned.includes("car");

const vaccinatedPetCount = function (person) {
  return person.pets.filter((pet) => pet.fullyVaccinated);
};

export const countPetsOfNonCarOwners = function (data) {
  return data.filter(nonCarOwnerdata).flatMap(vaccinatedPetCount).length;
};

// How many individuals live in cities starting with the letter "B"?
export const dataCountFromCityStartsWithB = function (data) {
  return data.filter((person) => person.livesIn.startsWith("B")).length;
};

//Which individuals do not own any pets?
const doesPersonHasPet = (person) => person.pets.length < 1;

const personName = (person) => person.name;

export const dataWithNoPets = function (data) {
  return data.filter(doesPersonHasPet).map(personName);
};

// Which pet is the youngest, and what is its name?
const youngerPet = (pet1, pet2) => (pet1.age > pet2.age ? pet2 : pet1);

export const youngestPet = function (data) {
  return data.flatMap(getPets).reduce(youngerPet).name;
};

// How many individuals have more than two hobbies?
export const peoleCountWithAtleat3Hobbies = function (data) {
  return data.filter((person) => person.hobbies.length > 2).length;
};


// What is the most common type of pet among the group?
const findPetCount = function (table, pet) {
  let row = table.find(function (row) {
    return row.type === pet.type;
  });

  row = row || { type: pet.type, count: 0 };

  if (row.count === 0) {
    table.push(row);
  }

  row.count += 1;
  return table;
};

const mostCommonPet = (pet1, pet2) => (pet1.count > pet2.count ? pet1 : pet2);

export const mostCommonPetType = function (data) {
  return data.flatMap(getPets).reduce(findPetCount, []).reduce(mostCommonPet).type;
};

//How many individuals share at least one hobby with Ramesh?
const hobbyType = (hobby) => hobby.type;

export const peopleCountSharesHobbyWithRamesh = function (data) {
  const rameshHobbies = data[2].hobbies.map(hobbyType);
  return data.filter((person) => person.hobbies.some((hobby) => {
    return rameshHobbies.includes(hobby.type);
  })).length - 1;
};

//What types of books are mentioned as interests, and who reads them?
export const mapBooksToReaders = (data) => {
  const dataWithReadingAsHobby = data.flatMap(person => {
    return { name: person.name, genre: person.hobbies.filter(hobby => hobby.type === 'reading') };
  });

  return dataWithReadingAsHobby.filter((person) => person.genre.length > 0).map((person) => {
    return { name: person.name, type: person.genre[0].specification };
  });
};
