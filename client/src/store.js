import { create } from 'zustand';

const useUniverseState = create((set) => ({
    name: null,
    mode: null,
    fixtures: [],
    setName: (name) => set({name: name}),
    setMode: (mode) => set({mode: mode}),
    setFixtures: (fixtures) => set({fixtures: fixtures}),
    updateFixture: (fixture) => {
        set(state => ({
            fixtures: state.fixtures.map(f => {
                return (f.id === fixture.id 
                ? fixture
                : f)
            })
        }))
    },
    toggleFixtureState: (on, uuid) => {
        set(state => ({
            fixtures: state.fixtures.map(f => {
                if(f.id === uuid){
                    f.channels.forEach(channel => {
                        channel.data = on? channel.default_value : 0
                    })
                }
            })
        }))
    },
    addFixture: (fixture) => {
        set(state => ({
            fixtures: [...state.fixtures, fixture]
        }))
    },
    removeFixture: (fixture) => {
        set(state => ({
            fixtures: state.fixtures.filter(f => {
                return f.id !== fixture.id
            })
        }))
    }
}))

export default useUniverseState;