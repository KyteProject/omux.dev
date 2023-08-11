---
title: "Timing Wheels: An In-depth Exploration"
author: Daniel Smith
pubDatetime: 2023-08-11T12:53:10Z
postSlug: "timing-wheels-an-in-depth-exploration"
featured: true
draft: false
comments: false
categories:
  - System Design
  - Software Engineering
tags:
  - Timing Wheels
  - System Design
  - Timer Management
  - Hierarchical Timing Wheels
  - Golang
  - Web Server Timeouts
  - Software Engineering
  - Networking Protocol
  - Real-time Systems
  - Database Cache Eviction
  - Performance Optimization
  - Scalability
ogImage: "../../assets/images/clock-2567921_1920.jpg"
description: "Explore the intricacies of timing wheels in system design. Dive deep into the evolution from simple timer lists to hierarchical timing wheels, their benefits, real-world applications, and Golang code examples."
---

![Setting Up WSL2: An Extensive Guide](../../assets/images/clock-2567921_1920.jpg)

## Table of contents

## Introduction

The essence of many software systems lies in the precision of their timing. Whether it's a database handling cache eviction, a networking protocol managing packet retransmissions, or a real-time system coordinating task executions, the capability to manage and execute operations based on time is essential.

Among the myriad of mechanisms devised to address this critical need, timing wheels have emerged as a particularly efficient solution.

This article delves into the heart of timing mechanisms, from basic timer lists to the sophisticated hierarchical timing wheels - we'll explore their origins, benefits, and practical applications.

## History and Origins

Our story begins with the quest for efficient timer management. Traditional mechanisms, while effective for smaller scales, encountered scalability issues as the number of timers grew.

This challenge gave birth to timing wheels - a concept initially introduced in pioneering research papers from institutions like MIT.

As the complexity and scale of our systems advanced, the need for robust timer management solutions grew, leading to the evolution and refinement of timing wheels which have become a cornerstone in high-performance systems design.

## A Journey Through Timing Mechanisms

Let's explore this evolution.

### 1. Unordered Timer List

- **Description**: A simplistic approach where timers are stored in an unordered list. To handle expirations, the entire list is scanned.
- **Mathematical Complexity**: Searching has a time complexity of `O(n)`.
- **Practical Usage**: Suitable for systems with a minimal number of timers.
- **Diagram**:
  [![](https://mermaid.ink/img/pako:eNqdkb0OgjAURl-lua4wKJMdTPhZddFJ69DQizQCJaVECeHdrXBNHI2d7mm-06b9RsiNQuBws7It2SkTDfMrvpx0jZatrwsnxBvilDgizogPxDELwx1LSJ4hJXMGuqZzQ4U-XOiq4qtiq4LOWXNHvoqiiObwoZUr-aZ9fjvJH076h5P96EAA_v211Mr_5fg-QYArsUYB3I9K2rsA0Uw-J3tnjkOTA3e2xwD6VkmHmZa-ghp4IavO76LSztj9Us7cUQCtbM7GfDLTCwKhi5g?type=png)](https://mermaid.live/edit#pako:eNqdkb0OgjAURl-lua4wKJMdTPhZddFJ69DQizQCJaVECeHdrXBNHI2d7mm-06b9RsiNQuBws7It2SkTDfMrvpx0jZatrwsnxBvilDgizogPxDELwx1LSJ4hJXMGuqZzQ4U-XOiq4qtiq4LOWXNHvoqiiObwoZUr-aZ9fjvJH076h5P96EAA_v211Mr_5fg-QYArsUYB3I9K2rsA0Uw-J3tnjkOTA3e2xwD6VkmHmZa-ghp4IavO76LSztj9Us7cUQCtbM7GfDLTCwKhi5g)

### 2. Ordered Timer List

- **Description**: An improvement over the unordered list, timers are stored in an ordered fashion based on expiration times.
- **Mathematical Complexity**: Insertion is `O(n)`, but accessing the nearest timer is `O(1)`.
- **Practical Usage**: Efficient for scenarios with frequent timer expirations but infrequent insertions.
- **Diagram**:
  [![](https://mermaid.ink/img/pako:eNqdkTFvwjAQhf-KdSwgJUPJhIdKJBlpB-gE7mDhS2OR2JFzEUWI_841cat2q_B0z_e-G967wtEbBAkfQXe12GyVE_zWBwVvtsUgnsR8573DnhYK3qdtfph2y6iLqLOoyx_6Vcw3mv7Aa5GmzyKPl0ZRxDOjKCfR06VBNle2aeSsWpmkp-BPKGdZlsU5PVtDtVx2n7-Z_AGmeIAp_8lAAhxFq63hmK9fFxRQjS0qkDwaHU4KlLuxTw_kdxd3BElhwASGznB6pdXcTguy0k3Pv2gs-fAy9TbWl0Cn3d77b8_tDq_ck9A?type=png)](https://mermaid.live/edit#pako:eNqdkTFvwjAQhf-KdSwgJUPJhIdKJBlpB-gE7mDhS2OR2JFzEUWI_841cat2q_B0z_e-G967wtEbBAkfQXe12GyVE_zWBwVvtsUgnsR8573DnhYK3qdtfph2y6iLqLOoyx_6Vcw3mv7Aa5GmzyKPl0ZRxDOjKCfR06VBNle2aeSsWpmkp-BPKGdZlsU5PVtDtVx2n7-Z_AGmeIAp_8lAAhxFq63hmK9fFxRQjS0qkDwaHU4KlLuxTw_kdxd3BElhwASGznB6pdXcTguy0k3Pv2gs-fAy9TbWl0Cn3d77b8_tDq_ck9A)

### 3. Timer Trees

- **Description**: Timers are organised in a balanced tree structure, offering better overall performance than simple lists.
- **Mathematical Complexity**: Operations like insertion and extraction are `O(logn)`.
- **Practical Usage**: Suitable for systems that need faster insertion and deletion operations than ordered lists can provide.
- **Diagram**:
  [![](https://mermaid.ink/img/pako:eNqdkk9rhDAQxb9KmL1qoQoLm0Nh_XvqZbunag_BxBpWjcRIuyz73ZtqlJTuQcxp3pv5DQN5NygEZYDhU5KuQucob5F-x-wkhEJn3jD5MVlBFla8ppOHno0b_nE940ZZKklLCxt4mpH4UXMmk_9NbyHTR82ZPCLXfUGBLUJz-SgiW8Tm-lEktkgn0atrzfSaktc13pUH6vRKigvDO9_3Te1-caoq7HXfNhMszGE1E25gooXZr2biDUyygUlXMuCA_sSGcKoTePvdkIOqWMNywLqkRF5yyNu7niODEm_XtgCs5MAcGDpKFIs40cFtAJek7rXLKFdCvk6RHpPtQEfadyHmmfsPeYDq5w?type=png)](https://mermaid.live/edit#pako:eNqdkk9rhDAQxb9KmL1qoQoLm0Nh_XvqZbunag_BxBpWjcRIuyz73ZtqlJTuQcxp3pv5DQN5NygEZYDhU5KuQucob5F-x-wkhEJn3jD5MVlBFla8ppOHno0b_nE940ZZKklLCxt4mpH4UXMmk_9NbyHTR82ZPCLXfUGBLUJz-SgiW8Tm-lEktkgn0atrzfSaktc13pUH6vRKigvDO9_3Te1-caoq7HXfNhMszGE1E25gooXZr2biDUyygUlXMuCA_sSGcKoTePvdkIOqWMNywLqkRF5yyNu7niODEm_XtgCs5MAcGDpKFIs40cFtAJek7rXLKFdCvk6RHpPtQEfadyHmmfsPeYDq5w)

### 4. Simple Timing Wheels

- **Description**: A circular buffer structure that enhances timer management by offering constant-time operations.
- **Mathematical Complexity**: Both insertion and expiration handling are `O(1)`.
- **Practical Usage**: Ideal for high-performance systems where efficiency is paramount.
- **Diagram**:
  [![](https://mermaid.ink/img/pako:eNptjz0LwkAMhv_KkbmLut3sqksFQbKEXmyD98WZDqX0v3taCg7NkIQnz5B3hi45BgtZ2GA0tVTUs2kl5DpuEiT25j4w-_WM0Pqk5oBgbO3_7LjDTjvsujFoIHAJJK5-MH8dBB04MIKtq6PyQsC4VI9GTe0UO7BaRm5gzI6Uz0J9oQD2Sf5dKTvRVC5rpF-yBjLFR0qbs3wA0-ZKPA?type=png)](https://mermaid.live/edit#pako:eNptjz0LwkAMhv_KkbmLut3sqksFQbKEXmyD98WZDqX0v3taCg7NkIQnz5B3hi45BgtZ2GA0tVTUs2kl5DpuEiT25j4w-_WM0Pqk5oBgbO3_7LjDTjvsujFoIHAJJK5-MH8dBB04MIKtq6PyQsC4VI9GTe0UO7BaRm5gzI6Uz0J9oQD2Sf5dKTvRVC5rpF-yBjLFR0qbs3wA0-ZKPA)

### 5. Hashing Wheel with Ordered Timer Lists

- **Description**: A hybrid approach that hashes timers into slots, with each slot maintaining an ordered list of timers.
- **Mathematical Complexity**: Combines the complexities of hashing and ordered lists.
- **Practical Usage**: Efficient in scenarios where timers are dispersed over a wide range of expiration times.
- **Diagram**:
  [![](https://mermaid.ink/img/pako:eNqdks1qwzAQhF9FbK72oTEUokMh_qOXkkNyatTDEq1rEdkyskwaQt69auwYUwiY6LQz7DcLYi5wMJKAw7fFpmS7VNTMv_X-HduSbbVx7OWr9-L9xkqyJNlOVWRHP_nnLwc_nWTcvexBRv4gY83C8I3FU5EM6TeRTUXei9adNfnlQmnNF8VKBq2z5kh8EUXRMIcnJV3Jl83PlIlHZjWbSZ5g0pF5nc1kT9zJZzIQgP_0CpX0Rbj8JQhwJVUkgPtRoj0KEPXV72HnzPZcH4A721EAXSPRUarQ96cCXqBuvUtSOWM_-mbdChZAg_WnMfed6y9cl8bs?type=png)](https://mermaid.live/edit#pako:eNqdks1qwzAQhF9FbK72oTEUokMh_qOXkkNyatTDEq1rEdkyskwaQt69auwYUwiY6LQz7DcLYi5wMJKAw7fFpmS7VNTMv_X-HduSbbVx7OWr9-L9xkqyJNlOVWRHP_nnLwc_nWTcvexBRv4gY83C8I3FU5EM6TeRTUXei9adNfnlQmnNF8VKBq2z5kh8EUXRMIcnJV3Jl83PlIlHZjWbSZ5g0pF5nc1kT9zJZzIQgP_0CpX0Rbj8JQhwJVUkgPtRoj0KEPXV72HnzPZcH4A721EAXSPRUarQ96cCXqBuvUtSOWM_-mbdChZAg_WnMfed6y9cl8bs)

### 6. Hashing Wheel with Unordered Timer Lists

- **Description**: Similar to its ordered counterpart but with unordered lists in each slot.
- **Mathematical Complexity**: Faster insertion but slower expiration handling than its ordered counterpart.
- **Practical Usage**: Suitable for systems where insertion frequency is higher than expiration handling.
- **Diagram**:
  [![](https://mermaid.ink/img/pako:eNqdkk2LwjAQhv9KGK_tQQsL5rBgv9jLnvSk8RDMdBtMm5JO2RXxv5u1tRRPxZzmeZlnAslc4WQVAocfJ5uS7VJRM382hy_ZlmxrLLHlsc_iw05X6EZOBl4NnE6cZ5a9OPmLs2Fh-MniKSTDtAdkU8h7aOli0DcX2hi-KNYqaMnZM_JFFEVDHf5qRSVfNX9TJx6d9WwnecNJR-djtpO9cU8-04EA_KNXUiv_0df_CQKoxAoFcF8q6c4CRH3zfbIju73UJ-DkOgyga5QkTLX0-1EBL6RpfYpKk3Xf_eY8FiiARtZ7a589tzsaertY?type=png)](https://mermaid.live/edit#pako:eNqdkk2LwjAQhv9KGK_tQQsL5rBgv9jLnvSk8RDMdBtMm5JO2RXxv5u1tRRPxZzmeZlnAslc4WQVAocfJ5uS7VJRM382hy_ZlmxrLLHlsc_iw05X6EZOBl4NnE6cZ5a9OPmLs2Fh-MniKSTDtAdkU8h7aOli0DcX2hi-KNYqaMnZM_JFFEVDHf5qRSVfNX9TJx6d9WwnecNJR-djtpO9cU8-04EA_KNXUiv_0df_CQKoxAoFcF8q6c4CRH3zfbIju73UJ-DkOgyga5QkTLX0-1EBL6RpfYpKk3Xf_eY8FiiARtZ7a589tzsaertY)

### 7. Hierarchical Timing Wheels

- **Description**: An extension of simple timing wheels to handle a wider range of expiration times without increasing granularity.
- **Mathematical Complexity**: While insertion remains `O(1)`, handling timers that get promoted to higher-level wheels might add overhead. However, it remains efficient for a broad range of timer expirations.
- **Practical Usage**: Systems requiring efficient timer management over both short and long durations benefit immensely from hierarchical wheels.
- **Diagram**:
  [![](https://mermaid.ink/img/pako:eNqdkj9vgzAQxb-KdVmhUkCqFA-Vwt-lndKppYMVHwHFYGRM2yjKd68LBpFMCE9-797vdMO7wlFyBAonxZqCvEdZTczbf77iNwqyJQch9ddgBtb0epNsrR3e2561I2v7Nv005uPHwUgk9wNvItLHwUjsieu-kGAuQntrL6K5iO25vUjmIh1Eqy8CzZq8FIJu8h13Wq3kGenG9337d39KrgvqNb9zJpiY3WImXMFEE_O8mIlXMMkKJl3IgAMVqoqV3LTu-r8hA11ghRlQ8-VMnTPI6pvJsU7Lw6U-AtWqQwe6hjONUclMWSugOROtcZGXWqq3ocZ9mx1oWP0h5Zi5_QHG8-Mr?type=png)](https://mermaid.live/edit#pako:eNqdkj9vgzAQxb-KdVmhUkCqFA-Vwt-lndKppYMVHwHFYGRM2yjKd68LBpFMCE9-797vdMO7wlFyBAonxZqCvEdZTczbf77iNwqyJQch9ddgBtb0epNsrR3e2561I2v7Nv005uPHwUgk9wNvItLHwUjsieu-kGAuQntrL6K5iO25vUjmIh1Eqy8CzZq8FIJu8h13Wq3kGenG9337d39KrgvqNb9zJpiY3WImXMFEE_O8mIlXMMkKJl3IgAMVqoqV3LTu-r8hA11ghRlQ8-VMnTPI6pvJsU7Lw6U-AtWqQwe6hjONUclMWSugOROtcZGXWqq3ocZ9mx1oWP0h5Zi5_QHG8-Mr)

## What is a Timing Wheel?

Stepping away from the theoretical and diving into the practical, let's demonstrate the concept of a timing wheel.

### Definition and Concept

Imagine a circular buffer, akin to the face of a clock. Each slot on this "clock" represents a time interval, and tasks or events are placed into these slots based on when they need to be executed.

As time progresses, a pointer (or "hand") rotates around this clock, and when it points to a slot, any tasks within that slot are executed.

### Code Example in Go

This Golang snippet provides a rudimentary representation of a timing wheel. It demonstrates how tasks can be inserted and how they are executed when the "tick" function is called.

```go
type TimerTask struct {
    Execute func()
}

type TimingWheel struct {
    slots []TimerTask
    currentPosition int
}

func NewTimingWheel(numSlots int) *TimingWheel {
    return &TimingWheel{
        slots: make([]TimerTask, numSlots),
        currentPosition: 0,
    }
}

func (tw *TimingWheel) Insert(task TimerTask, position int) {
    tw.slots[position] = task
}

func (tw *TimingWheel) Tick() {
    task := tw.slots[tw.currentPosition]
    task.Execute()
    tw.currentPosition = (tw.currentPosition + 1) % len(tw.slots)
}
```

## Advantages of Timing Wheels

Peeling back the layers, let's delve into what makes timing wheels an effective solution in system design.

#### Scalability

Timing wheels excel in scenarios where there are a large number of timers to be managed. Traditional timer data structures, like heaps, may suffer from performance degradation as the number of timers increases. Timing wheels offer a more scalable alternative.

#### Constant Time Complexity

The insertion and deletion of timers in a timing wheel are typically constant-time operations, which is a significant advantage over other data structures that may require logarithmic or linear time.

#### Memory Efficiency

Given the fixed size of the timing wheel, memory allocations are predictable and minimal, leading to reduced overhead and better performance.

## Applications in System Design and Software Engineering

Diving into real-world applications, let's explore where timing wheels prove their usefulness.

#### Networking

In the transmision of data packets on a network, timing wheels choreograph events like packet retransmissions in protocols such as TCP. Their efficient timer management ensures seamless communication.

#### Distributed Systems

In complex domain of distributed systems, where numerous nodes collaborate, timing wheels handle tasks like heartbeat checks, lease renewals, and more. Their precision ensures system consistency and resilience.

#### Real-time Systems

Precision is the soul of real-time systems. From robotics to media playback, tasks need execution at exact intervals. Timing wheels prove highly effective at this.

#### Databases

Databases, the backbone of many modern applications, rely on timing wheels for functions like cache eviction and garbage collection. This ensures data retrieval remains swift and system health optimal.

## Real-World Scenario: Web Server Request Timeouts

Imagine you're building a web server in Golang. This server interacts with several services, databases, and even external APIs.

To ensure that a slow or unresponsive service doesn't cause the entire server to hang, you implement request timeouts.

### The Problem

You receive thousands of requests per second, each with its own timeout. Managing these timeouts efficiently is crucial to ensure smooth server operations.

### The Solution

Implementing a timing wheel to handle these timeouts.

1. **Every incoming request gets a timer set for its timeout duration**.
2. **If a request is completed before its timeout, its timer is cancelled**.
3. **If the timer expires, the request is terminated, and an appropriate timeout response is sent back**.

### Implementation in Golang

Let's draft a basic implementation using a simplified timing wheel:

```go
package main

import (
	"fmt"
	"time"
)

type Request struct {
	ID      int
	Timeout time.Duration
	Cancel  chan bool
}

type TimingWheel struct {
	slots          []chan Request
	currentPosition int
	tickDuration   time.Duration
}

func NewTimingWheel(numSlots int, tickDuration time.Duration) *TimingWheel {
	tw := &TimingWheel{
		slots:          make([]chan Request, numSlots),
		tickDuration:   tickDuration,
		currentPosition: 0,
	}
	for i := range tw.slots {
		tw.slots[i] = make(chan Request, 10) // assuming a buffer size of 10 for each slot
	}
	return tw
}

func (tw *TimingWheel) Insert(req Request) {
	position := (tw.currentPosition + int(req.Timeout/tw.tickDuration)) % len(tw.slots)
	tw.slots[position] <- req
}

func (tw *TimingWheel) Start() {
	ticker := time.NewTicker(tw.tickDuration)
	defer ticker.Stop()

	for range ticker.C {
		slot := tw.slots[tw.currentPosition]
		close(slot)
		tw.slots[tw.currentPosition] = make(chan Request, 10)

		// Handle expired requests
		for req := range slot {
			select {
			case <-req.Cancel:
				// Request was completed in time
			default:
				fmt.Printf("Request %d timed out!\n", req.ID)
			}
		}

		tw.currentPosition = (tw.currentPosition + 1) % len(tw.slots)
	}
}

func main() {
	tw := NewTimingWheel(60, time.Second) // 60 slots, 1 second per tick

	go tw.Start()

	// Simulating incoming requests
	for i := 0; i < 100; i++ {
		req := Request{
			ID:      i,
			Timeout: time.Duration(5+i%10) * time.Second, // random timeouts between 5 to 15 seconds
			Cancel:  make(chan bool),
		}
		tw.Insert(req)
	}

	// Simulating some requests completing before timeout
	time.Sleep(8 * time.Second)
	for i := 0; i < 50; i++ {
		close(tw.slots[i%60][i].Cancel)
	}

	// Let the program run for a while
	time.Sleep(2 * time.Minute)
}
```

This is a rudimentary implementation to demonstrate the concept. In a real-world scenario, you'd integrate this with your web server's request handling, ensuring that each request has a timer associated with it in the timing wheel.

The advantage here is the efficiency in handling a large number of timeouts without significant overhead.

## Conclusion

As our digital landscapes evolve, transitioning towards real-time and data-intensive ecosystems, the significance of efficient timer management mechanisms cannot be understated. Timing wheels offer a robust solution to this problem, and their applications are widespread.

They are yet another useful tool in the software engineers arsenal, and I hope this article gave you a good introduction to timing wheels and their applications. If you have any questions or feedback, feel free to reach out to me!

## References

1. [ACM: Efficient Timer Management](https://dl.acm.org/doi/abs/10.1109/90.650142)
2. [Confluent: Apache Kafka and Hierarchical Timing Wheels](https://www.confluent.io/blog/apache-kafka-purgatory-hierarchical-timing-wheels/)
3. [GitHub: Golang Implementation of Timing Wheel](https://github.com/RussellLuo/timingwheel)
4. [The Morning Paper: Hashed and Hierarchical Timing Wheels](https://blog.acolyer.org/2015/11/23/hashed-and-hierarchical-timing-wheels/)
5. Image by <a href="https://pixabay.com/users/mondisso-41027/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2567921">Steffen L.</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=2567921">Pixabay</a>
