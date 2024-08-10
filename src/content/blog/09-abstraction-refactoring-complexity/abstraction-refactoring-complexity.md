---
title: "Abstraction, Refactoring, Complexity, and Tradeoffs - Part 1"
pubDatetime: 2024-04-26T14:52:43Z
slug: "abstraction-refactoring-complexity"
featured: true
draft: false
commentsEnabled: false
categories:
  - Software Engineering
  - Code Quality
  - Go
tags:
  - What is abstraction in software engineering?
  - Code refactoring techniques
  - Managing complexity in software
  - Software development tradeoffs
  - Benefits of abstraction in coding
  - How to refactor code
  - Refactoring best practices
  - Software architecture and abstraction
  - Tools for code refactoring
  - Examples of abstraction in software
ogImage: "./omux-abstraction-refactoring-complexity.jpg"
description: "Learn how abstraction helps manage complexity, and how refactoring improves code quality and maintainability."
---

| Key Takeaways                                                             |
| ------------------------------------------------------------------------- |
| Abstraction helps manage complexity by hiding unnecessary details         |
| Refactoring improves code quality, readability, and maintainability       |
| Complexity management requires making thoughtful design tradeoffs         |
| Continuous learning and improvement is a key skill for software engineers |

## Complexity and software development

Software engineering is the process of designing, developing, testing, and maintaining software systems that are efficient, reliable, and scalable. As projects increase in size and scope, managing [complexity](https://en.wikipedia.org/wiki/Programming_complexity) becomes an ever pressing concern.

Unnecessary complexity makes our systems harder to develop, debug, operate and plan. It increases development time and cost, while reducing quality and reliability. At scale, the compounding effects of complexity can be dramatically destructive — leading to buggy, brittle systems that are expensive to maintain.

So, how can we effectively manage all that complexity while still delivering valuable functionality? The answer lies in skilfully integrating principles like abstraction and refactoring into our daily practice, while employing smart design trade-offs.

In this article, we'll dive into the concepts of abstraction and refactoring, look at some best practices and techniques, and discuss how to strike the right balance when managing complexity in software projects.

## The Power of Abstraction

> Abstraction is the elimination of the irrelevant and the amplification of the essential - Robert C. Martin

[Abstraction](<https://en.wikipedia.org/wiki/Abstraction_(computer_science)>), put simply, is about reducing complexity by obscuring superfluous details. We can consider it to be a sliding scale between two extremes:

- Exposing all the specifics of how something works
  vs
- Providing a simplified “black box” that accomplishes our objectives without requiring any knowledge of the internals.

In software, we're always aiming to find the right level on that scale for the task at hand.

By abstracting away unnecessary complexity, we can make our code easier to understand, use and modify. Abstraction allows us to break a complex system down into simpler, more manageable components that can be developed and tested independently.

Some common examples of abstraction are:

- Functions and methods that encapsulate a reusable chunk of behaviour
- Classes and interfaces that model concepts in the problem domain
- Packages/libraries that provide higher-level capabilities
- Service APIs that expose functionality without implementation details

For example, consider a `Customer` class in an e-commerce application:

```go
type Customer struct {
    ID        int
    FirstName string
    LastName  string
    Email     string
}

func (c *Customer) FullName() string {
    return c.FirstName + "" "" + c.LastName
}
```

Here, the `Customer` type abstracts a customer entity, exposing only the essential fields and a `FullName()` method. The underlying database schema, validation logic, etc are hidden behind this simple interface.

Abstraction enables the compositionality of construction — allowing us to create complex systems by combining well-defined, simpler components.

However, it's important to apply abstraction judiciously. Over-abstraction can make the code harder to understand and navigate. Under-abstraction can leak too many details and increase coupling.

When designing abstractions, some key principles to follow are:

- Encapsulate what varies
- Program to an interface, not an implementation
- Prefer composition to inheritance
- Strive for loose coupling between objects that interact
- Depend on abstractions, not on concretions

Additionally, abstraction can introduce security risks if not implemented carefully. An abstraction may not properly encapsulate all the properties needed to ensure the security of the system. Striking the right balance is key!

## Refactoring to Manage Complexity

> Refactoring is a disciplined technique for restructuring an existing body of code, altering its internal structure without changing its external behavior — Martin Fowler

Where abstraction is about the design and structure of our code, [refactoring](https://en.wikipedia.org/wiki/Code_refactoring) is about continuous improvement and evolution of that design over time. It's the process of making small, behaviour-preserving transformations to improve its quality.

By continuously refactoring code, we can:

- Eliminate duplication and redundancy
- Improve performance and resource usage
- Fix broken windows and pay down technical debt
- Make our code more testable
- Improve code organisation and modularity
- Simplify complex logic and flows

Common code smells that indicate the need for refactoring include:

- Long methods or classes
- Duplicate or similar code
- Complex conditional logic
- Unnecessary coupling or dependencies
- Unclear or misleading names
- Commented out code
- Magic numbers and strings

Effective refactoring requires a clear vision and objectives, as it can be time-consuming and may introduce new risks if not done carefully. Some useful refactoring techniques include:

- Abstract common code into reusable functions or classes
- Inline redundant methods or variables
- Decompose large classes or methods
- Replace Conditional with Polymorphism
- Replace Inheritance with Delegation
- Consolidate Conditional Expression
- Decompose Conditional
- Separate Query from Modifier

Tools like [Gofmt](https://pkg.go.dev/cmd/gofmt) and [Golint](https://pkg.go.dev/golang.org/x/lint) can help automate some refactoring tasks in Go. However, manual code reviews and refactoring sessions are still essential.

### Code Example

For example, consider refactoring this duplicated code:

```go
func CalculateRectangleArea(length, width float64) float64 {
    return length * width
}

func CalculateSquareArea(side float64) float64 {
    return side * side
}
```

We can refactor this to eliminate the duplication:

```go
func CalculateRectangleArea(length, width float64) float64 {
    return CalculateArea(length, width)
}

func CalculateSquareArea(side float64) float64 {
    return CalculateArea(side, side)
}

func CalculateArea(a, b float64) float64 {
    return a * b
}
```

By extracting the common area calculation, we've made the code more DRY (_Don't Repeat Yourself_) aligned and maintainable.

The key is “little and often” — refactoring should be a regular habit, not a big bang event. By making it part of your team's daily work, and by leaning on their tests as a safety net, refactoring can be a low-risk way to keep a codebase in great shape.

## Making Smart Design Trade-offs

Software engineering is all about making design [trade-offs](https://en.wikipedia.org/wiki/Trade-off) between competing concerns, like:

- Features vs simplicity
- Performance vs maintainability
- Generalisation vs specificity
- Consistency vs flexibility

For every design decision, we must carefully weigh the costs and benefits and optimise for the most important priorities. Techniques like prototyping, user feedback, benchmarking and profiling can help inform these trade-offs.

For example, consider designing a web scraper. We could make it highly generic to handle many website structures. But this would add a lot of complexity and maintenance burden. Alternatively, we could make it simpler and more specific to just the sites we need to scrape. This would be much easier to implement and maintain, but less reusable.

### Over-Abstraction

Over-abstraction can lead to:

- Increased complexity of the abstractions themselves
- Difficulty seeing the flow and interactions in the system
- Reduced performance from extra layering
- Harder debugging and understanding of runtime behaviour

### Under-Abstraction

Under-abstraction tends to result in:

- Code duplication and tight coupling
- Lack of reusability and composability
- Missed opportunities for insight and unification
- Reinventing wheels and failing to build on past work

In the end, the right trade-off depends on our specific context and priorities. The key is to be explicit about the trade-offs we're making and align them with our goals.

Some heuristics to help with this:

- Aggressively cut scope and resist over-designing up front
- Create abstractions only when painful duplication emerges
- When creating an abstraction, get it working first, then refactor
- Treat tests as an essential safety net for refactoring
- Timebox refactoring and focus on the biggest bang for buck
- Involve the whole team and spread knowledge continuously

## The SOLID Principles

The [SOLID](https://en.wikipedia.org/wiki/SOLID) principles offer a set of guidelines for writing maintainable, flexible object-oriented code:

- **_S_**ingle Responsibility Principle — A class should have just one reason to change
- **_O_**pen/Closed Principle — A class should be open for extension but closed for modification
- **_L_**iskov Substitution Principle — Subclasses should be substitutable for their base classes
- **_I_**nterface Segregation Principle — Clients should not depend on interfaces they don't use
- **_D_**ependency Inversion Principle — Depend on abstractions, not concretions

Following SOLID helps us create more modular, decoupled code. However, applying the principles consistently requires good judgment. We must avoid premature abstraction and excessive indirection. It's a balancing act.

## The 80% Abstraction

The 80% abstraction concept suggests that often the initial 80% of an abstraction is easy to implement and covers most needs. But the remaining 20% takes disproportionately more effort for diminishing returns.

For example, we could spend months building a fancy GUI designer framework to handle every possible use case. Or we could just make a simple, straightforward version that solves the most common scenarios, and iterate from there.

The 80% approach helps us avoid over-engineering and deliver value faster. We can always come back and refine the abstraction later as needed. The key is to be deliberate about what level of abstraction is appropriate at each stage.

## Continuous Learning and Improvement

The field of software engineering is constantly evolving, with new languages, frameworks, tools and best practices emerging all the time. To be successful, software engineers must continuously learn, experiment and strengthen their skills.

Some ways to keep learning include:

- Reading books, blogs, and articles
- Watching conference talks and tutorials
- Participating in online communities
- Contributing to open-source projects
- Pair programming with experienced developers
- Attending workshops and training sessions

By exposing ourselves to new ideas and approaches, we can expand our thinking and find better ways to tackle complexity.

## Conclusion

Managing complexity is one of the core challenges in software engineering. By skilfully applying abstraction, refactoring, and design trade-offs, we can write cleaner, more maintainable and more valuable code.

But there are no silver bullets. Becoming a good software engineer requires years of hard work, continuous learning and deliberate practice. We must strive deeply to understand the fundamentals, while staying curious and open to new ideas. It's a lifelong journey of growth and improvement.

### Closing Words

I hope this article gave you an overall understanding of a concept that is both highly impactful and important for harmonious software development.

In part 2 I plan to delve more explicitly into real-world scenarios and problems encountered by teams at scale.

Thanks for reading!

## References

1. _Martin, R. C. (2008)_. **Clean Code: A Handbook of Agile Software Craftsmanship**. Prentice Hall.
2. _Fowler, M. (2018)_. **Refactoring: Improving the Design of Existing Code**. Addison-Wesley Professional.
3. **Go Programming Language Specification**. (n.d.). Retrieved from [Go Spec](https://golang.org/doc/go_spec.html)
4. _McConnell, S. (2004)_. **Code Complete: A Practical Handbook of Software Construction (2nd ed.)**. Microsoft Press.
5. _Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994)_. **Design Patterns: Elements of Reusable Object-Oriented Software**. Addison-Wesley Professional.
6. _Hunt, A., & Thomas, D. (1999)_. **The Pragmatic Programmer: From Journeyman to Master**. Addison-Wesley Professional.
