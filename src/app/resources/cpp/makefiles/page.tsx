"use client";
import CodeBlock from "~/_components/CodeBlock";
import PageHero from "~/_components/PageHero";

export default function CPPGettingStarted()
{
    const makefile : string = `####################
# Makefile Example #
####################

# Compiler and flags:
CXX := g++
CXXFLAGS := -g -O2 -Wall -Wextra -Werror  -Wconversion --std=c++20

# Directories:
SRC_DIR := src
BUILD_DIR := build
INCLUDE_DIR := include

# Source and object files:
SRCS := $(wildcard $(SRC_DIR)/*.cpp)
OBJS := $(patsubst $(SRC_DIR)/%.cpp, $(BUILD_DIR)/%.o, $(SRCS))

# Output binary:
TARGET := main

# Default target:
all: $(TARGET)

# Link object files into the final binary:
$(TARGET): $(OBJS)
    $(CXX) $(OBJS) -o $@

# Compile each .cpp to .o in build/
$(BUILD_DIR)/%.o: $(SRC_DIR)/%.cpp
    @mkdir -p $(BUILD_DIR)
    $(CXX) $(CXXFLAGS) -c $< -o $@

clean:
    @rm -rf $(BUILD_DIR) $(TARGET)

tar:
    @tar -czf project.tar.gz Makefile $(SRCS) $(wildcard $(INCLUDE_DIR)/*.hpp) $(wildcard $(INCLUDE_DIR)/*.h)

.PHONY: all tar clean`;

    return(
        <main className="flex flex-col row-start-2">
            <PageHero line1="C++" line2="Makefiles" back="/resources"/>
            <section id="next-section" className="bg-gray-800 flex flex-col justify-center items-center gap-10 h-350">
                <p className="text-red-500 text-2xl"><strong>It's not that bad...</strong></p>
                <p className="text-white text-6xl">EXAMPLE MAKEFILE</p>
                <p className="text-white text-md text-left max-w-200">
                    Here is an example of a make file that I have used for multifile C++ projects.
                    This make file has been mainly used on Linux.
                </p> 
                <CodeBlock
                    language="makefile"
                    code={makefile}
                />
            </section>
        </main>
    )
}
