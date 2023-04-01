import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import Fixture from './src/types/fixture';


interface UniverseState {
    name: string,
    mode: string,
    fixtures: Array<Fixture>
    setName: (name: string) => void,
    setMode: (mode: string) => void,
    setFixtures: (fixtures:Array<Fixture>) => void,
    updateFixture: (fixture: Fixture) => void,
    // toggleFixtureState: (on: boolean, fixture: Fixture) => void,
    addFixture: (fixture: Fixture) => void,
    removeFixture: (fixture: Fixture) => void
}

const useUniverseState = create<UniverseState>()(
    devtools(
        persist(
            (set) => ({
                name: "",
                mode: "",
                fixtures: [],
                setFixtures: (fixtures: Fixture[]) => set({fixtures: fixtures}),
                setName: (name: string) => set({name: name}),
                setMode: (mode: string) => set({mode: mode}),
                updateFixture: (fixture: Fixture) => {
                    set(state => ({
                        fixtures: state.fixtures.map(f => {
                            return (f.id === fixture.id 
                            ? fixture
                            : f)
                        })
                    }))
                },
                addFixture: (fixture: Fixture) => {
                    set(state => ({
                        fixtures: [...state.fixtures, fixture]
                    }))
                },
                removeFixture: (fixture: Fixture) => {
                    set(state => ({
                        fixtures: state.fixtures.filter(f => {
                            return f.id !== fixture.id
                        })
                    }))
                }
            }),
            {
                name: 'universe-storage'
            }
        )
    )
)

export default useUniverseState;