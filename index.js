/**
 * Main application logic for the team generator.
 * @namespace TeamGenerator
 */
"use strict";

document.addEventListener("alpine:init", () => {
    Alpine.data("teamGenerator", () => ({
        /**
         * The comma-separated string of member names.
         * @type {string}
         */
        membersInput: "",

        /**
         * The desired number of teams.
         * @type {number}
         */
        numberOfTeams: 2,

        /**
         * The array of generated teams, where each team is an array of members.
         * @type {Array<Array<string>>}
         */
        generatedTeams: [],

        /**
         * Shuffles an array in place using the Fisher-Yates (Knuth) algorithm.
         * @param {Array<any>} array - The array to shuffle.
         * @returns {Array<any>} The shuffled array.
         */
        shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        },

        /**
         * Parses a string of comma-separated names into a cleaned array of strings.
         * @param {string} namesString - The string of names.
         * @returns {Array<string>} The cleaned array of member names.
         */
        parseMembers(namesString) {
            return namesString
                .split(",")
                .map((name) => name.trim())
                .filter((name) => name !== "");
        },

        /**
         * Generates and distributes members into the specified number of teams.
         */
        generateTeams() {
            // Reset the teams display
            this.generatedTeams = [];

            // Parse and shuffle the member names
            const members = this.parseMembers(this.membersInput);
            if (members.length === 0) {
                return; // Do nothing if there are no members
            }
            const shuffledMembers = this.shuffleArray([...members]);

            // Create and populate teams
            const newTeams = Array.from(
                { length: this.numberOfTeams },
                () => []
            );

            shuffledMembers.forEach((member, index) => {
                const teamIndex = index % this.numberOfTeams;
                newTeams[teamIndex].push(member);
            });

            // Update the state
            this.generatedTeams = newTeams;
        },
    }));
});
