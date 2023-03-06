use super::{scene::Scene, program::Program};

/// A cyclical program is just a collection of scenes that are played sequentially
/// and loop when the last scene of the program is reached. Programs in general
/// are identified by a name and the universe they were programed for.
pub struct CyclicalProgram{
    name: String,
    universe: String,
    scenes: Vec<Scene>
}